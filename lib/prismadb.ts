import {PrismaClient} from '@prisma/client';

declare global {
    // var를 사용하는 이유는 선언 범위가 전역 범위 또는 함수 범위이기 때문이다.
    var prisma: PrismaClient | undefined;
}

// 변경할 수 없는 상수 prismadb를 A가 존재하면 반영하고 미 존재시 B를 반영 한다.
const prismadb = globalThis.prisma || new PrismaClient();

// production 환경이 아니면 전역 prisma는 현 프로젝트에서 생성된 prismadb 변수로 한다
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prismadb;

export default prismadb;
