-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('author', 'member');

-- CreateTable
CREATE TABLE "public"."users" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."workspaces" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "workspaces_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user_workspaces" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "workspaceId" INTEGER NOT NULL,
    "role" "public"."Role" NOT NULL DEFAULT 'member',

    CONSTRAINT "user_workspaces_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "workspaces_name_key" ON "public"."workspaces"("name");

-- CreateIndex
CREATE UNIQUE INDEX "workspaces_slug_key" ON "public"."workspaces"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "user_workspaces_userId_workspaceId_key" ON "public"."user_workspaces"("userId", "workspaceId");

-- AddForeignKey
ALTER TABLE "public"."user_workspaces" ADD CONSTRAINT "user_workspaces_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_workspaces" ADD CONSTRAINT "user_workspaces_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "public"."workspaces"("id") ON DELETE CASCADE ON UPDATE CASCADE;
