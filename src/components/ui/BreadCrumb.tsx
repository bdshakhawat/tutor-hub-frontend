'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";


const BreadCrumb = ({className=''}) => {
  const path = usePathname();
  const path1 = path.split("/")[1];
  const path2 = path.split("/")[2];
  const path3 = path.split("/")[3];
  const path4 = path.split("/")[4];

  
  return (
    <div className={`text-sm breadcrumbs ${className}`}>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        {path1 && (
          <li>
            <Link href={`/${path1}`}>{path1}</Link>
          </li>
        )}
        {path2 && (
          <li>
            <Link href={`/${path1}/${path2}`}>{path2}</Link>
          </li>
        )}
        {path3 && (
          <li>
            <Link href={`/${path1}/${path2}/${path3}`}>{path3}</Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default BreadCrumb