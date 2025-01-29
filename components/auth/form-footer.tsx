import Link from "next/link";

type FormFooterProps = {
  footerLabel: string;
  footerHref: string;
};

const FormFooter = ({ footerLabel, footerHref }: FormFooterProps) => {
  return (
    <div className="pt-4 text-end text-[#884DEE] hover:underline hover:underline-offset-4 font-medium text-sm">
      <Link href={footerHref}>{footerLabel}</Link>
    </div>
  );
};

export default FormFooter;
