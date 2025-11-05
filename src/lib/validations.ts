'use client'

import { z } from 'zod';

// CPF validation
export const cpfSchema = z.string().refine((cpf) => {
    if (typeof cpf !== 'string') return false;
    cpf = cpf.replace(/[\.\-]/g, '');
    if (cpf.length !== 11 || !/\d{11}/.test(cpf) || /^(\d)\1{10}$/.test(cpf)) return false;
    let sum = 0;
    for (let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i)) * (10 - i);
    let rest = 11 - (sum % 11);
    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== parseInt(cpf.charAt(9))) return false;
    sum = 0;
    for (let i = 0; i < 10; i++) sum += parseInt(cpf.charAt(i)) * (11 - i);
    rest = 11 - (sum % 11);
    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== parseInt(cpf.charAt(10))) return false;
    return true;
}, 'CPF inválido');

// CNPJ validation
export const cnpjSchema = z.string().refine((cnpj) => {
    if (typeof cnpj !== 'string') return false;
    cnpj = cnpj.replace(/[\.\-\/]/g, '');
    if (cnpj.length !== 14 || !/\d{14}/.test(cnpj) || /^(\d)\1{13}$/.test(cnpj)) return false;
    let length = cnpj.length - 2;
    let numbers = cnpj.substring(0, length);
    const digits = cnpj.substring(length);
    let sum = 0;
    let pos = length - 7;
    for (let i = length; i >= 1; i--) {
        sum += parseInt(numbers.charAt(length - i)) * pos--;
        if (pos < 2) pos = 9;
    }
    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(0))) return false;
    length = length + 1;
    numbers = cnpj.substring(0, length);
    sum = 0;
    pos = length - 7;
    for (let i = length; i >= 1; i--) {
        sum += parseInt(numbers.charAt(length - i)) * pos--;
        if (pos < 2) pos = 9;
    }
    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(1))) return false;
    return true;
}, 'CNPJ inválido');

// Phone validation
export const phoneSchema = z.string().refine((phone) => {
    if (typeof phone !== 'string') return false;
    const justNumbers = phone.replace(/[^0-9]/g, '');
    return justNumbers.length >= 10 && justNumbers.length <= 11;
}, 'Telefone inválido');

// Step 1: Account type selection
export const step1Schema = z.object({
    accountType: z.enum(['pf', 'pj'], { required_error: 'Selecione o tipo de conta' }),
});

// Step 2: Personal data (PF)
export const step2PfSchema = z.object({
    fullName: z.string().min(3, 'Nome completo é obrigatório'),
    phone: phoneSchema,
    email: z.string().email('E-mail inválido'),
    cpf: cpfSchema,
    password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
});

// Step 2: Company data (PJ)
export const step2PjSchema = z.object({
    companyName: z.string().min(3, 'Nome da empresa é obrigatório'),
    cnpj: cnpjSchema,
    legalRepresentativeName: z.string().min(3, 'Nome do responsável é obrigatório'),
    legalRepresentativeCpf: cpfSchema,
    corporateEmail: z.string().email('E-mail corporativo inválido'),
    phone: phoneSchema,
    password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
});

// Step 3: Property data (PF)
export const step3PfSchema = z.object({
    farmName: z.string().optional(),
    farmSize: z.string().optional(),
    state: z.string().optional(),
    city: z.string().optional(),
    activityType: z.string().optional(),
});

// Step 3: Property data (PJ)
export const step3PjSchema = z.object({
    farmName: z.string().optional(),
    state: z.string().min(1, 'Estado é obrigatório'),
    city: z.string().min(1, 'Cidade é obrigatória'),
    operationTypes: z.array(z.string()).min(1, 'Selecione ao menos um tipo de atuação'),
    activityType: z.string().optional(),
    farmSize: z.string().optional(),
});

// Step 4: Confirmation
export const step4Schema = z.object({
    acceptTerms: z.boolean().refine((val) => val === true, {
        message: 'Você deve aceitar os Termos de Uso e a Política de Privacidade',
    }),
});