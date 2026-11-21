import { useState } from 'react';
import type { IProduct } from '../api/api';
import { ProductForm } from './ProductForm';

interface ProductProps {
  product: IProduct;
  onSave: (product: IProduct) => void;
  onDelete: (id: number) => void;
}

export function Product({ product, onSave, onDelete }: ProductProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <ProductForm
        initialData={product}
        onSubmit={(data) => {
          onSave({ ...data, id: product.id });
          setIsEditing(false);
        }}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div className="rounded-lg border bg-white px-4 py-2.5 text-sm">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 truncate">
          <span className="font-mono text-xs text-gray-500">
            #{product.id}{isExpanded && ` · ${product.category}`}
          </span>
          <span className={isExpanded ? 'text-base font-semibold' : 'truncate font-medium'}>
            {product.title}
          </span>
        </div>

        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => setIsExpanded((prev) => !prev)}
            className="text-blue-600 hover:underline"
          >
            {isExpanded ? 'Свернуть' : 'Открыть'}
          </button>
          {!isExpanded && (
            <button
              onClick={() => onDelete(product.id)}
              className="text-red-600 hover:underline"
            >
              Удалить
            </button>
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="mt-3 space-y-3">
          <p className="text-gray-600">{product.description}</p>

          <div className="flex gap-4 text-xs text-gray-700">
            <span>Цена: <b>${product.price}</b></span>
            <span>Остаток: <b>{product.stock}</b></span>
            <span>Рейтинг: <b>★ {product.rating}</b></span>
          </div>

          <div className="flex justify-end gap-3 border-t pt-2.5">
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-600 hover:underline"
            >
              Редактировать
            </button>
            <button
              onClick={() => onDelete(product.id)}
              className="text-red-600 hover:underline"
            >
              Удалить
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
