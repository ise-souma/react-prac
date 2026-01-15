import styles from "../page.module.css"
import Link from "next/link"

type Props = {
    params:{
        id:string
    }
}

export default function ProductsList({params}:Props){
    return (
       <div className={styles.container}>
            <main className={styles.main}>
                <h2 className={styles.title}>商品一覧</h2>

                <ul className="list-disc pl-5">
                    <li>
                        <Link href = "/products/smartphone">
                        スマートフォン
                        </Link>
                    </li>
                    <li>
                        <Link href = "/products/pc">
                            パソコン
                        </Link>
                    </li>
                    <li>
                        <Link href = "/products/headhon">
                            ヘッドホン
                        </Link>
                    </li>
                </ul>
            </main>
       </div>
    )
}