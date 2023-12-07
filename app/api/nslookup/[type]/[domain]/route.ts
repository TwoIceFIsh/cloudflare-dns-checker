import dns from "dns";
import { NextResponse } from "next/server";
import isIPInRanges from "@/app/Functions/VerifyIpRange";
export const dynamic = 'force-dynamic'
async function resolveDns(type: string, domain: string): Promise<string[]> {
  return new Promise<string[]>((resolve, reject) => {
    let dnsFunction;

    dnsFunction = dns.resolve4;

    if (dnsFunction) {
      dnsFunction(domain, (err, outputAddresses) => {
        if (err) {
          reject(new Error(`DNS resolution error: ${err.message}`));
        } else {
          resolve(outputAddresses);
        }
      });
    } else {
      reject(new Error("Unsupported DNS type"));
    }
  });
}

export async function GET(
  request: Request,
  context: { params: { type: string; domain: string } },
) {
  try {
    const { type, domain } = context.params;

    if (!type || !domain) {
      return NextResponse.json({
        status: 400,
        error: "Missing type or domain",
      });
    }

    const addresses: string[] = await resolveDns(type, domain);

    let cfIp: boolean[] = addresses.map((ip) => isIPInRanges(ip));

    return NextResponse.json({ status: 200, type, domain, addresses, cfIp });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred";
    return NextResponse.json({ status: 400, error: errorMessage });
  }
}
