import { NextResponse } from "next/server";
import { User } from "../../../../microservices/user/entities/User";
import { getUserDataSource } from "../../../../microservices/user/user-connection";

export const runtime = "nodejs";

type UserRequestBody = {
  name?: string;
  email?: string;
  password?: string;
};

export async function POST(request: Request) {
  try {
    const { name, email, password } = (await request.json()) as UserRequestBody;

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Нэр, и-мэйл, нууц үгээ бүрэн оруулна уу." },
        { status: 400 },
      );
    }

    const dataSource = await getUserDataSource();
    const userRepo = dataSource.getMongoRepository(User);
    const user = userRepo.create({ name, email, password });
    const savedUser = await userRepo.save(user);

    return NextResponse.json(savedUser, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: "Хэрэглэгч нэмэх үед алдаа гарлаа." },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const dataSource = await getUserDataSource();
    const users = await dataSource.getMongoRepository(User).find();

    return NextResponse.json(users);
  } catch {
    return NextResponse.json(
      { message: "Хэрэглэгчийн жагсаалт авах үед алдаа гарлаа." },
      { status: 500 },
    );
  }
}

