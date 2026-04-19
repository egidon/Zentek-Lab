export function mapProduct(rawProduct = {}) {
  return {
    id: rawProduct.id ?? rawProduct.Id ?? null,
    name: rawProduct.name ?? rawProduct.Name ?? '',
    price: Number(rawProduct.price ?? rawProduct.Price ?? 0),
    description: rawProduct.description ?? rawProduct.Description ?? '',
    createdAt: rawProduct.createdAt ?? rawProduct.CreatedAt ?? ''
  };
}

export function mapProducts(rawProducts = []) {
  if (!Array.isArray(rawProducts)) {
    return [];
  }

  return rawProducts.map(mapProduct);
}

export function buildProductPayload(values) {
  return {
    name: values.name.trim(),
    price: Number(values.price),
    description: values.description.trim()
  };
}
