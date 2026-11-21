import { useState } from 'react';
import type { IProduct } from '../api/api';

type ProductFormData = Omit<IProduct, 'id'>;

interface ProductFormProps {
  initialData?: ProductFormData;
  submitLabel?: string;
  onSubmit: (data: ProductFormData) => void;
  onCancel?: () => void;
}

const emptyData: ProductFormData = {
  title: '',
  description: '',
  category: '',
  price: 0,
  stock: 0,
  rating: 5,
};

export function ProductForm({
  initialData = emptyData,
  submitLabel = 'Сохранить',
  onSubmit,
  onCancel,
}: ProductFormProps) {
  const [form, setForm] = useState<ProductFormData>(initialData);

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-lg border border-blue-400 bg-white p-4 text-sm">
      <input
        required
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        placeholder="Название"
        className="w-full"
      />
      <textarea
        required
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        placeholder="Описание"
        className="w-full"
      />
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <input
          required
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          placeholder="Категория"
          className="rounded border px-2.5 py-1.5"
        />
        <input
          required
          type="number"
          step="0.01"
          value={form.price || ''}
          onChange={(e) => setForm({ ...form, price: +e.target.value })}
          placeholder="Цена"
        
        />
        <input
          required
          type="number"
          value={form.stock || ''}
          onChange={(e) => setForm({ ...form, stock: +e.target.value })}
         
        />
        <input
          required
          type="number"
          step="0.1"
          min="0"
          max="5"
          value={form.rating}
          onChange={(e) => setForm({ ...form, rating: +e.target.value })}
          placeholder="Рейтинг"
        
        />
      </div>
      <div className="flex justify-end gap-2">
        {onCancel && (
          <button type="button" onClick={onCancel} className="rounded border px-3 py-1">
            Отмена
          </button>
        )}
        <button type="submit" className="rounded bg-blue-600 px-3 py-1 text-white">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
