import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "隱私政策 Privacy Policy",
  description:
    "PURESKI 株式会社隱私政策：說明本公司透過官方網站、線上預約系統，以及 LINE、Facebook、Instagram 官方帳號客服訊息服務所收集之個人資料的處理方式。",
  alternates: { canonical: "/privacy" },
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-10">
      <h2 className="serif-line text-xl font-semibold tracking-wide text-ink">
        {title}
      </h2>
      <div className="mt-4 space-y-3 leading-8 tracking-wide text-ink-soft">
        {children}
      </div>
    </div>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        jp="規約"
        en="PRIVACY"
        title="隱私政策"
        sub="Privacy Policy"
        watermark="b"
        big="ski-boots"
        bigOpacity={0.1}
        bigSize="compact"
      />

      <div className="mx-auto max-w-3xl px-6 pb-28">
        <Reveal>
          <p className="leading-9 tracking-wide text-ink-soft">
            PURESKI 株式会社（下稱「本公司」）重視您的個人資料保護。本隱私政策說明本公司透過官方網站、線上預約系統，以及
            LINE、Facebook、Instagram 官方帳號客服訊息服務所收集之個人資料的處理方式。
          </p>

          <Section title="一、收集的資料">
            <ul className="space-y-2">
              <li>・姓名或社群平台暱稱、大頭貼等公開個人檔案資訊</li>
              <li>・聯絡方式（電子郵件、電話號碼、社群帳號）</li>
              <li>
                ・您與本公司客服的訊息內容（含透過 LINE / Facebook / Instagram 傳送之訊息）
              </li>
              <li>
                ・課程預約與訂單資訊（課程內容、日期、人數、付款狀態；本公司不儲存信用卡卡號）
              </li>
            </ul>
          </Section>

          <Section title="二、使用目的">
            <ul className="space-y-2">
              <li>・滑雪課程預約、訂單與收款管理</li>
              <li>・客服諮詢回覆（含系統輔助之自動回覆）</li>
              <li>・課程相關通知與服務聯繫</li>
            </ul>
          </Section>

          <Section title="三、資料儲存與安全">
            <p>
              資料儲存於具備存取控制與加密傳輸之雲端資料庫，僅本公司授權人員可存取。本公司不會出售或出租您的個人資料予任何第三方。
            </p>
          </Section>

          <Section title="四、第三方服務">
            <p>
              本公司使用下列第三方平台提供服務，該等平台依其各自的隱私政策處理資料：Meta（Facebook /
              Instagram）、LINE、Stripe（線上付款）、Razio（課程預訂系統）、雲端伺服器服務商。
            </p>
          </Section>

          <Section title="五、資料保存期限">
            <p>
              個人資料於服務目的達成後保存至多 3
              年，逾期即刪除或匿名化處理；法令另有規定者從其規定。
            </p>
          </Section>

          <Section title="六、用戶資料刪除（Data Deletion）">
            <p>您可隨時要求刪除本公司持有之您的個人資料，方式如下：</p>
            <ul className="space-y-2">
              <li>
                ・寄送電子郵件至 snow.purelove@gmail.com，標題註明「資料刪除申請」，並提供您使用的社群帳號名稱或預約資訊以供核對；或
              </li>
              <li>・透過 LINE / Facebook / Instagram 官方帳號私訊告知「我要刪除我的資料」。</li>
            </ul>
            <p>本公司將於收到申請後 14 個工作天內完成刪除並回覆確認。</p>
          </Section>

          <Section title="七、聯絡方式">
            <p>
              PURESKI 株式会社（日本北海道）
              <br />
              Email：snow.purelove@gmail.com
              <br />
              官方網站：https://www.pureski-school.com
            </p>
          </Section>

          <p className="mt-10 text-sm text-ink-soft/70">
            本政策最後更新日期：2026 年 7 月 4 日。本公司得隨時修訂本政策，修訂後將公布於本頁面。
          </p>
        </Reveal>
      </div>

      <Footer />
    </>
  );
}
