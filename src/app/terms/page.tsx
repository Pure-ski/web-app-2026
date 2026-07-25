import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "課程條款與規則",
  description:
    "PURE SKI 滑雪純愛組課程預訂須知：課程限制、上課規範、人數異動、風險告知、責任範圍、保險，以及完整取消與退費政策。報名前請務必詳閱。",
  alternates: { canonical: "/terms" },
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-12">
      <h2 className="serif-line text-xl font-semibold tracking-wide text-ink">
        {title}
      </h2>
      <div className="mt-4 space-y-3 leading-8 tracking-wide text-ink-soft">
        {children}
      </div>
    </div>
  );
}

const CANCELLATION_TABLE = [
  { range: "所選日期前 61 天以上取消", fee: "收取訂單金額之 2.5%" },
  { range: "所選日期前 31～60 天之間取消", fee: "收取訂單金額之 20%" },
  { range: "所選日期前 16～30 天之間取消", fee: "收取訂單金額之 50%" },
  { range: "所選日期前 8～15 天之間取消", fee: "收取訂單金額之 80%" },
  { range: "所選日期 0～7 天之間取消", fee: "無法退款" },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        jp="規約"
        en="TERMS"
        title="課程條款與規則"
        sub="請務必詳閱，報名即視為同意以下所有內容"
        watermark="c"
        big="ski"
        bigOpacity={0.1}
        bigSize="compact"
      />

      <div className="mx-auto max-w-3xl px-6 pb-28">
        <Reveal>
          <p className="serif-line text-lg font-semibold leading-9 tracking-wide">
            課程預訂須知
          </p>
          <p className="mt-4 leading-9 tracking-wide text-ink-soft">
            請於預訂前仔細閱讀以下資訊，確認後再進行報名，謝謝！更多資訊可透過官方 LINE
            與客服討論。
          </p>

          <Section title="同行人員告知義務">
            <p>
              本活動由代表人統一報名者，報名代表人有義務將本「訂課須知」之完整內容，主動轉知並確保全體同行人員皆已詳閱且同意。
            </p>
            <p>報名完成即視為全體同行人員均已同意本契約之所有規範。</p>
            <p>
              若因代表人未善盡告知義務而導致同行人員之權益受損或產生糾紛，應由報名代表人自行承擔相關責任。
            </p>
          </Section>

          <Section title="課程限制">
            <ul className="space-y-2">
              <li>・本課程不開放未滿 4 歲兒童（實際足歲）</li>
              <li>・4-6 歲幼童限定一對一教學</li>
              <li>・7-12 歲兒童可與成人同班，教練訓練重心以兒童為主</li>
              <li>・60 歲以上長者需向客服索取相關確認表格</li>
              <li>・每團人數上限 6 人（教練學員比 1:6）</li>
              <li>・建議程度相近學員一同報名，家庭建議大人與小孩分班教學</li>
              <li>・不接受學員間自行更換名額，課程僅限報名本人參加</li>
            </ul>
          </Section>

          <Section title="課堂專屬影音紀錄">
            <p>
              為了協助您檢視動作、留下美好的課堂回憶，教練在課程中會適時協助拍攝照片或影片。拍攝時可能會使用您的個人手機，或使用教練手機錄製後傳送給您；所有影音檔案「僅供您個人留存與使用」，學校絕對不會未經同意公開您的任何畫面。
            </p>
            <p>
              若您因個人隱私或特殊因素完全不想被拍攝，請務必於上課前主動告知客服人員，以便我們留存文字紀錄。我們收到後會提前幫您備註給現場教練，教練將不會對您進行任何拍攝，請您放心享受課程！
            </p>
          </Section>

          <Section title="上課規範">
            <ul className="space-y-2">
              <li>・課程當日如遇雪場全面關閉或政府禁止，可全額退費或免費改期</li>
              <li>・雪場正常營運但天氣不佳，不予因天氣因素要求退費</li>
              <li>・請於集合時間準時集合，遲到不予補時或補課</li>
              <li>・課程時間內，只要學員於下課前抵達仍可上課，不視為曠課</li>
              <li>・上課期間未依教練指導或進行危險行為，教練有權終止課程</li>
              <li>・全員必須配戴安全帽</li>
            </ul>
          </Section>

          <Section title="人數異動">
            <ul className="space-y-2">
              <li>・當天臨時有人無法參加：不退差額</li>
              <li>・當天臨時多一人參加：須補繳差額，視教練人力狀況，不保證接受</li>
            </ul>
          </Section>

          <Section title="風險告知與健康聲明">
            <ul className="space-y-2">
              <li>・學員理解滑雪為具有固有風險之運動，係自願參加並承擔相關風險</li>
              <li>
                ・如有心臟病、高血壓、癲癇、懷孕、近期手術等狀況，應於預約時主動告知。未告知者，本校不承擔相關責任
              </li>
              <li>
                ・課程當天禁止飲酒或服用影響判斷力之藥物。教練經客服協調後有權拒絕授課，視同學員自行取消，不予退費
              </li>
            </ul>
          </Section>

          <Section title="責任範圍">
            <ul className="space-y-2">
              <li>・因未遵從教練指導、超越能力範圍等學員自身原因導致受傷，本校不承擔賠償責任</li>
              <li>・課程結束後自行練習期間之意外，不屬於本校責任範圍</li>
              <li>・其他雪場使用者造成之碰撞傷害，應向該當事人求償</li>
              <li>・自備裝備故障導致受傷，本校不負責；租借裝備責任歸屬租借方</li>
              <li>・不建議攜帶貴重物品前往雪場，如遺失或損毀，本校與教練不負相關責任</li>
            </ul>
          </Section>

          <Section title="保險">
            <p>本校已投保最高日幣 2 億元第三方責任保險（保障課程中因教練過失導致之損傷）。</p>
            <p>
              學員個人傷害需自行投保旅遊平安險（建議傷害醫療保額 60 萬台幣以上）。信用卡附贈保險通常不涵蓋滑雪活動。
            </p>
          </Section>

          <Section title="取消與退費政策">
            <p className="font-semibold text-ink">注意事項</p>
            <ul className="space-y-2">
              <li>・無故曠課：視同課程前不滿 7 天取消，不予退款</li>
              <li>・雪場全面關閉或政府禁止：全額退費或免費改期</li>
              <li>・雪場正常營運但天氣不佳：不予退費</li>
            </ul>

            <p className="mt-6 font-semibold text-ink">取消政策</p>
            <div className="overflow-x-auto">
              <table className="mt-3 w-full min-w-[420px] border-collapse overflow-hidden rounded-[4px] border border-ink/15 text-sm">
                <thead>
                  <tr className="bg-card/70 text-left">
                    <th className="border-b border-ink/15 px-4 py-3 font-bold">距離出發日</th>
                    <th className="border-b border-ink/15 px-4 py-3 font-bold">取消費用</th>
                  </tr>
                </thead>
                <tbody>
                  {CANCELLATION_TABLE.map((row) => (
                    <tr key={row.range} className="odd:bg-card/30">
                      <td className="border-b border-ink/10 px-4 py-3">{row.range}</td>
                      <td className="border-b border-ink/10 px-4 py-3">{row.fee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-8 font-semibold text-ink">補充說明：其他滑雪課程退改與取消政策</p>

            <p className="mt-4 font-semibold text-ink/90">1）雪場與天候因素</p>
            <p>
              雪場全面關閉或政府禁令：因強風、暴風雪等天候因素導致雪場完全關閉、纜車全日停駛，或政府因天災發布禁止通行／活動之指令，可辦理全額退費或免費改期。
            </p>
            <p>
              雪場正常營運但天氣不佳：若雪場正常營運，僅因個別學員考量天氣不佳（如雨天、視線不佳、氣溫過低、風大但未停駛等）而欲取消課程，原則上不予退費。
            </p>

            <p className="mt-4 font-semibold text-ink/90">2）學員個人受傷／疾病（課前或課中）</p>
            <p>
              課前受傷：須於課前 12
              小時內提供「合格醫院開立之英文／當地語言醫生證明（診斷書）」以辦理全額退費（或扣除
              5%-10% 行政規費）。若遇當日突發緊急意外送醫，憑當日就醫診斷證明亦可同等受理。
            </p>
            <p>
              課中受傷：若於課程進行中因受傷無法繼續後續行程，憑醫生證明，可按比例退還翌日起未上完之課程費用（受傷當日之課程因教練已出勤，恕無法退費，敬請見諒）。
            </p>

            <p className="mt-4 font-semibold text-ink/90">3）交通中斷</p>
            <p>
              因班機延誤、大雪封路（如前往北海道的 JR
              或巴士停駛）導致學員無法按時抵達，但在雪場正常營運的情況下，憑官方交通工具延誤／停駛證明，可協助辦理免費改期或退還
              50% 費用。
            </p>

            <p className="mt-4 font-semibold text-ink/90">4）無故曠課與取消規定</p>
            <p>
              無故曠課（No-show）：學員若未依約定時間抵達且未提前通知，無故曠課將視同於「課程前不滿 7
              天取消」，不予任何退款。
            </p>
          </Section>
        </Reveal>
      </div>

      <Footer />
    </>
  );
}
