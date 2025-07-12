"use client";

import React from 'react';
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("testing");

  return (
    <div>
      <h1>{t("hello")}</h1>
    </div>
  );
}
