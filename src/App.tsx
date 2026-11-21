import { useEffect, useState } from 'react';
import { SearchInput } from './components/Search';
import { Product } from './components/Product';
import { ProductForm } from './components/ProductForm';
import { Pagination } from './components/Pagination';
import {
  getProducts,
  searchProduct,
  createProduct,
  updateProductById,
  deleteProductById,
  type IProduct,
} from './api/api';

const LIMIT = 10;

export default function App() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    let ignore = false;
    setLoading(true);

    const request = searchQuery.trim()
      ? searchProduct(searchQuery)
      : getProducts({ limit: LIMIT, skip });

    request
      .then((res) => {
        if (ignore) return;
        setProducts(res.products);
        setTotal(res.total);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [skip, searchQuery]);

  const handleSearch = (query: string) => {
    setSkip(0);
    setSearchQuery(query);
  };

  const handleCreate = async (data: Omit<IProduct, 'id'>) => {
    const created = await createProduct(data);
    setProducts((prev) => [{ ...data, ...created }, ...prev]);
    setIsCreating(false);
  };

  const handleUpdate = async (updated: IProduct) => {
    const { id, ...fields } = updated;
    const saved = await updateProductById(id, fields);
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...updated, ...saved } : item))
    );
  };

  const handleDelete = async (id: number) => {
    await deleteProductById(id);
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <main className="mx-auto min-h-screen max-w-3xl space-y-5 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <SearchInput onSearch={handleSearch} />
        <button
          type="button"
          onClick={() => setIsCreating((prev) => !prev)}
          className="rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-green-700"
        >
          {isCreating ? 'Закрыть' : '+ Добавить товар'}
        </button>
      </div>

      {isCreating && (
        <ProductForm
          submitLabel="Создать"
          onSubmit={handleCreate}
          onCancel={() => setIsCreating(false)}
        />
      )}

      {loading ? (
        <div className="py-10 text-center text-sm text-gray-500">Загрузка...</div>
      ) : products.length === 0 ? (
        <div className="py-10 text-center text-sm text-gray-500">Товары не найдены</div>
      ) : (
        <div className="space-y-2.5">
          {products.map((product) => (
            <Product
              key={product.id}
              product={product}
              onSave={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {!searchQuery.trim() && (
        <Pagination
          skip={skip}
          limit={LIMIT}
          total={total}
          onChange={setSkip}
        />
      )}
    </main>
  );
}
