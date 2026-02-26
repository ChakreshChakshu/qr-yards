import { typeToCategory } from "./template-config";
import type { TemplateStyle } from "./template-config";
import LinkPreview from "./LinkPreview";
import ContactPreview from "./ContactPreview";
import MessagePreview from "./MessagePreview";
import WifiPreview from "./WifiPreview";
import EventPreview from "./EventPreview";
import ListPreview from "./ListPreview";
import CouponPreview from "./CouponPreview";
import TextPreview from "./TextPreview";

interface TemplateRendererProps {
  typeId: string;
  data: Record<string, string>;
  style: TemplateStyle;
}

const TemplateRenderer = ({ typeId, data, style }: TemplateRendererProps) => {
  const category = typeToCategory[typeId] || "link";

  switch (category) {
    case "link":
      return <LinkPreview data={data} typeId={typeId} style={style} />;
    case "contact":
      return <ContactPreview data={data} typeId={typeId} style={style} />;
    case "message":
      return <MessagePreview data={data} typeId={typeId} style={style} />;
    case "wifi":
      return <WifiPreview data={data} style={style} />;
    case "event":
      return <EventPreview data={data} style={style} />;
    case "list":
      return <ListPreview data={data} typeId={typeId} style={style} />;
    case "coupon":
      return <CouponPreview data={data} style={style} />;
    case "text":
      return <TextPreview data={data} typeId={typeId} style={style} />;
    default:
      return <LinkPreview data={data} typeId={typeId} style={style} />;
  }
};

export default TemplateRenderer;
