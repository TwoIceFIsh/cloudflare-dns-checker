type Range = [number, number];

function ipToInt(ip: string): number {
  const parts = ip.split(".").map((part) => parseInt(part, 10));
  return (parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3];
}

function parseCIDR(cidr: string): Range {
  const [ip, prefix] = cidr.split("/");
  const mask = ~(0xffffffff >>> parseInt(prefix, 10));
  const start = ipToInt(ip) & mask;
  const end = start + ~mask;
  return [start, end];
}

const IPv4 = {
  contains: function (range: string, ip: string): boolean {
    const [start, end] = parseCIDR(range);
    const target = ipToInt(ip);
    return start <= target && target <= end;
  },
};

const IP_RANGES: string[] = [
  "173.245.48.0/20",
  "103.21.244.0/22",
  "103.22.200.0/22",
  "103.31.4.0/22",
  "141.101.64.0/18",
  "108.162.192.0/18",
  "190.93.240.0/20",
  "188.114.96.0/20",
  "197.234.240.0/22",
  "198.41.128.0/17",
  "162.158.0.0/15",
  "104.16.0.0/13",
  "104.24.0.0/14",
  "172.64.0.0/13",
  "131.0.72.0/22",
];

function isIPInRanges(ip: string): boolean {
  for (let range of IP_RANGES) {
    if (IPv4.contains(range, ip)) {
      return true;
    }
  }
  return false;
}

export default isIPInRanges;
