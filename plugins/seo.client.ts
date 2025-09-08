// SEO 优化插件
export default defineNuxtPlugin(() => {
  // 结构化数据 - FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is BMI?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "BMI (Body Mass Index) is a measure of body fat based on height and weight that applies to adult men and women. It's calculated by dividing weight in kilograms by height in meters squared."
        }
      },
      {
        "@type": "Question",
        "name": "How is BMI calculated?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "BMI is calculated by dividing your weight in kilograms by your height in meters squared: BMI = weight (kg) / height (m)². For imperial units: BMI = (weight in pounds / height in inches²) × 703."
        }
      },
      {
        "@type": "Question",
        "name": "What are the BMI categories?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "BMI categories are: Underweight (below 18.5), Normal weight (18.5-24.9), Overweight (25.0-29.9), and Obese (30.0 and above)."
        }
      },
      {
        "@type": "Question",
        "name": "Is BMI accurate for everyone?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "BMI is a useful screening tool but has limitations. It may not accurately reflect body composition for athletes, elderly people, or those with high muscle mass. Consult a healthcare provider for personalized assessment."
        }
      },
      {
        "@type": "Question",
        "name": "What is a healthy BMI range?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A healthy BMI range is typically 18.5 to 24.9. This range is associated with the lowest risk of health problems related to weight."
        }
      }
    ]
  }

  // 工具 Schema
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "BMI Calculator",
    "description": "Free online BMI calculator to calculate your Body Mass Index",
    "url": "https://bmicalculator.friday-go.icu",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "BMI Calculation",
      "Metric and Imperial Units",
      "BMI Categories",
      "Health Recommendations",
      "BMI Chart",
      "Weight Management",
      "pfnalclub"
    ],
    "author": {
      "@type": "Organization",
      "name": "BMI Calculator"
    },
    "publisher": {
      "@type": "Organization",
      "name": "BMI Calculator"
    },
    "datePublished": "2024-01-01",
    "dateModified": "2024-01-01"
  }

  // 网站 Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "BMI Calculator",
    "url": "https://bmicalculator.friday-go.icu",
    "description": "Free online BMI calculator and health assessment tool",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://bmicalculator.friday-go.icu/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }

  // 添加到页面头部
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(faqSchema)
      },
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(toolSchema)
      },
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(websiteSchema)
      }
    ]
  })
})
