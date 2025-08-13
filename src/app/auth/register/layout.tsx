import { PageIndicator } from "../_components/page-indicator";

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="font-sans">
      <div className="">
        <PageIndicator />
      </div>
      <section className=" mt-12 mx-auto max-w-[90%] md:max-w-10/12">
        {children}
      </section>
    </main>
  );
}
