import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href="/chat">Chat</Link>
      <br />
      <Link href="/users">User</Link>
      <br />
      <Link href="/home">Home</Link>
    </div>
  );
}
