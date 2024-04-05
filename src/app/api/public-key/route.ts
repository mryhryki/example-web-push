import { getServerPublicKey } from "@/app/util/keys";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ publicKey: getServerPublicKey() });
}
