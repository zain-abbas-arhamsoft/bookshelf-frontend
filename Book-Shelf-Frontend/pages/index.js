
import { useRouter } from 'next/router';
import Signup from '@/components/form/signup';
import Link from 'next/link';

// Rename the function to start with an uppercase letter
export default function Index() {
  const router = useRouter();

  return (
    <>
      {router.pathname === '/' && <Signup />}
      <Link href='/' passHref></Link>
    </>
  );
}
