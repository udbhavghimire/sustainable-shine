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
            <h2 className="heading-2 text-gray-900 mt-4">
              Cleaning Services in {cityName}
            </h2>
          </div>

          {/* Description content */}
          <div
            className="prose prose-lg max-w-none text-gray-600 leading-relaxed
              prose-headings:text-gray-900 prose-headings:font-bold
              prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-800"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </div>
    </section>
  );
}
