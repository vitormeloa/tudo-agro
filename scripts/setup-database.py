#!/usr/bin/env python3
import os
import requests
import json
from dotenv import load_dotenv

# Carregar variáveis de ambiente
load_dotenv('.env.local')

SUPABASE_URL = os.getenv('NEXT_PUBLIC_SUPABASE_URL')
SERVICE_KEY = os.getenv('SUPABASE_SERVICE_ROLE_KEY')

if not SUPABASE_URL or not SERVICE_KEY:
    print("❌ Variáveis de ambiente do Supabase não encontradas!")
    exit(1)

def execute_sql(sql_command):
    """Executa um comando SQL no Supabase"""
    url = f"{SUPABASE_URL}/rest/v1/rpc/exec"
    headers = {
        "apikey": SERVICE_KEY,
        "Authorization": f"Bearer {SERVICE_KEY}",
        "Content-Type": "application/json"
    }
    
    data = {
        "sql": sql_command
    }
    
    try:
        response = requests.post(url, headers=headers, json=data)
        if response.status_code == 200:
            return True, None
        else:
            return False, f"HTTP {response.status_code}: {response.text}"
    except Exception as e:
        return False, str(e)

def main():
    print("🚀 Iniciando configuração do banco de dados...")
    
    # Ler o arquivo SQL
    try:
        with open('supabase-schema.sql', 'r', encoding='utf-8') as f:
            sql_content = f.read()
    except FileNotFoundError:
        print("❌ Arquivo supabase-schema.sql não encontrado!")
        return
    
    # Dividir em comandos individuais
    commands = [cmd.strip() for cmd in sql_content.split(';') if cmd.strip() and not cmd.strip().startswith('--')]
    
    print(f"📝 Executando {len(commands)} comandos SQL...")
    
    success_count = 0
    for i, command in enumerate(commands, 1):
        if command:
            success, error = execute_sql(command)
            if success:
                print(f"✅ Comando {i} executado com sucesso")
                success_count += 1
            else:
                print(f"⚠️  Comando {i} falhou: {error}")
    
    print(f"🎉 Configuração concluída! {success_count}/{len(commands)} comandos executados com sucesso.")
    
    # Verificar tabelas criadas
    print("\n📊 Verificando tabelas criadas...")
    success, error = execute_sql("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'")
    if success:
        print("✅ Tabelas verificadas com sucesso")
    else:
        print(f"⚠️  Erro ao verificar tabelas: {error}")

if __name__ == "__main__":
    main()