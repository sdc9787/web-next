"use client";

import Link from "next/link";

export default function CategoryItem({ result }) {
  if (!result || result.length === 0) {
    return <div className="no-result-message">검색 결과가 없습니다.</div>;
  }
  return (
    <div className="main-pm-list">
      {result.map((a, i) => (
        <Link className="pm-Link" href={"/buy/" + result[i]._id.toString()}>
          <div className="pm-list" key={i}>
            <img src={"/uploads/" + result[i].myImage} />
            <h4>{result[i].name}</h4>
            <span>{result[i].price} 원</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
