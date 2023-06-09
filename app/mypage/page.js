import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { LogOutBtn } from "../LogOutBtn";
import LoginBtn from "../LoginBtn";
import { connectDB } from "@/util/database";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default async function Mypage() {
  let session = await getServerSession(authOptions);
  return (
    <div>
      <div className="navbar">
        <div className="navbar-table">
          {session ? (
            <Link className="navbar-title" href="/">
              THESINSA
            </Link>
          ) : (
            <Link className="navbar-title" href="/">
              THESINSA
            </Link>
          )}

          {session ? (
            <Link className="navbar-a select" href="/mypage">
              마이페이지
            </Link>
          ) : (
            <Link className="navbar-a" href="/login?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F">
              마이페이지
            </Link>
          )}

          {session ? (
            session.user.root == 1 ? (
              <Link className="navbar-a" href="/basket">
                장바구니
              </Link>
            ) : (
              <div></div>
            )
          ) : (
            <Link className="navbar-a" href="/login?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F">
              장바구니
            </Link>
          )}

          {session ? (
            session.user.root == 0 ? (
              <Link className="navbar-a" href="/pm">
                상품관리
              </Link>
            ) : (
              <div></div>
            )
          ) : (
            <Link className="navbar-a" href="/login?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F">
              상품관리
            </Link>
          )}
        </div>
        <form className="search-item" action="/api/search" method="POST">
          <div className="search-icon">
            <input className="search" name="search" placeholder="검색" type="search" />
            <button>
              <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" />
            </button>
          </div>
        </form>
        <div className="navber-login-sginup-search">
          {session ? (
            session.user.root == 1 ? (
              <span className="session-login">
                <span>{session.user.name}님[소비자]</span> <LogOutBtn />
              </span>
            ) : (
              <span className="session-login">
                <span>{session.user.name}님[판매자]</span> <LogOutBtn />
              </span>
            )
          ) : (
            <LoginBtn></LoginBtn>
          )}
          {session ? <span></span> : <Link href={"/signup"}>회원가입</Link>}
        </div>
      </div>

      <h4 className="create-title animate__animated animate__fadeIn">메인페이지</h4>
      <div className="create-frame animate__animated animate__fadeIn">
        <form className="create-form" action="/api/mypage" method="POST">
          <div className="product-info">
            <span style={{ fontWeight: "700" }}>현재 비밀번호</span>
            <input name="password" type="password" />
            <span style={{ fontWeight: "700" }}>변경할 비밀번호</span>
            <input name="newpassword" type="password" />
            <input style={{ display: "none" }} name="session" type="text" value={session.user.password} />
            <input style={{ display: "none" }} name="id" type="text" value={session.user.email} />
            <button style={{ fontSize: "13px", fontWeight: "900" }} type="submit">
              비밀번호 변경
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
