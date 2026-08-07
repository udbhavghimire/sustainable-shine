/**
 * SuburbDescription — renders the suburb-specific description below the FAQ.
 * Renders nothing if description is null / empty.
 *
 * This is a server component — no "use client" needed.
 */
export default function SuburbDescription({ description, cityName }) {
  if (!description) return null;

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-emerald-500 font-semibold text-sm uppercase tracking-wide">
              About the Area
            </span>
           
          </div>

          {/* Description content */}
          <div
            className="prose prose-lg max-w-none text-center text-gray-600 leading-relaxed
              prose-headings:text-gray-900 prose-headings:font-bold prose-headings:text-center
              prose-p:text-center
              prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-800
              prose-ul:mx-auto prose-ol:mx-auto prose-ul:list-inside prose-ol:list-inside"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </div>
    </section>
  );
}
