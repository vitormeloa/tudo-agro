'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Define the types for the genealogy data
interface AnimalNode {
  name: string;
  children?: AnimalNode[];
}

// Mock data for the genealogy tree
const paternalTree: AnimalNode = {
  name: 'Grande Campeão',
  children: [
    {
      name: 'Campeão Jr.',
      children: [
        { name: 'Touro Lendário' },
        { name: 'Vaca Premiada' },
      ],
    },
    {
      name: 'Matriz de Ouro',
      children: [
        { name: 'Reprodutor Famoso' },
        { name: 'Doadora de Elite' },
      ],
    },
  ],
};

const maternalTree: AnimalNode = {
  name: 'Grande Matriarca',
  children: [
    {
      name: 'Vaca Recordista',
      children: [
        { name: 'Touro Importado' },
        { name: 'Matriz Consagrada' },
      ],
    },
    {
      name: 'Doadora Excepcional',
      children: [
        { name: 'Genearca da Raça' },
        { name: 'Vaca de Ouro' },
      ],
    },
  ],
};

// Component to render a single node in the tree
const TreeNode: React.FC<{ node: AnimalNode }> = ({ node }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 shadow-sm">
        <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{node.name}</p>
      </div>
      {node.children && node.children.length > 0 && (
        <div className="flex gap-8 mt-4">
          {node.children.map((child, index) => (
            <div key={index} className="flex flex-col items-center relative">
              <div className="absolute top-0 left-1/2 w-0.5 h-4 bg-gray-300 dark:bg-gray-600"></div>
              <TreeNode node={child} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const GenealogyTree = () => {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-center mb-6">Genealogia Paterna</h3>
        <div className="flex justify-center">
          <TreeNode node={paternalTree} />
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-bold text-center mb-6">Genealogia Materna</h3>
        <div className="flex justify-center">
          <TreeNode node={maternalTree} />
        </div>
      </div>
    </div>
  );
};

export default GenealogyTree;
