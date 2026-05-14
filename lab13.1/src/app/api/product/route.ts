import { NextResponse } from "next/server";
import { Product } from "../../../../microservices/product/entities/Product";
import { getProductDataSource } from "../../../../microservices/product/product-connection";

export const runtime = "nodejs";

type ProductRequestBody = {
  name?: string;
  price?: number | string;
};

export async function POST(request: Request) {
  try {
    const { name, price } = (await request.json()) as ProductRequestBody;
    const numericPrice = Number(price);

    if (!name || !Number.isFinite(numericPrice) || numericPrice < 0) {
      return NextResponse.json(
        { message: "Бүтээгдэхүүний нэр болон үнийг зөв оруулна уу." },
        { status: 400 },
      );
    }

    const dataSource = await getProductDataSource();
    const productRepo = dataSource.getMongoRepository(Product);
    const product = productRepo.create({ name, price: numericPrice });
    const savedProduct = await productRepo.save(product);

    return NextResponse.json(savedProduct, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: "Бүтээгдэхүүн нэмэх үед алдаа гарлаа." },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const dataSource = await getProductDataSource();
    const products = await dataSource.getMongoRepository(Product).find();

    return NextResponse.json(products);
  } catch {
    return NextResponse.json(
      { message: "Бүтээгдэхүүний жагсаалт авах үед алдаа гарлаа." },
      { status: 500 },
    );
  }
}

