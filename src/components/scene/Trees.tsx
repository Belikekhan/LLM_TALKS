"use client";

import React, { useMemo } from "react";

interface TreeData {
  id: number;
  left: number;
  height: number;
  width: number;
}

export default function Trees() {
  const trees = useMemo(() => {
    const result: TreeData[] = [];
    // Left cluster
    for (let i = 0; i < 5; i++) {
      result.push({
        id: i,
        left: 2 + Math.random() * 14,
        height: 80 + Math.random() * 60,
        width: 30 + Math.random() * 20,
      });
    }
    // Right cluster
    for (let i = 5; i < 10; i++) {
      result.push({
        id: i,
        left: 82 + Math.random() * 14,
        height: 80 + Math.random() * 60,
        width: 30 + Math.random() * 20,
      });
    }
    // A few filling mid-far positions
    for (let i = 10; i < 14; i++) {
      result.push({
        id: i,
        left: 15 + Math.random() * 70,
        height: 50 + Math.random() * 40,
        width: 25 + Math.random() * 15,
      });
    }
    return result;
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        bottom: "18%",
        left: 0,
        right: 0,
        height: "200px",
        pointerEvents: "none",
      }}
    >
      {trees.map((tree) => (
        <div
          key={tree.id}
          style={{
            position: "absolute",
            left: `${tree.left}%`,
            bottom: "0",
            width: `${tree.width}px`,
            height: `${tree.height}px`,
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            backgroundColor: "#050510",
          }}
        />
      ))}
    </div>
  );
}
