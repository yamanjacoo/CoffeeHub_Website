import Image from "next/image"

const partners = [
  {
    name: "De'Longhi",
    image: "https://brandlogos.net/wp-content/uploads/2022/05/delonghi-logo_brandlogos.net_ji5xi-512x512.png",
  },
  {
    name: "Breville",
    image: "https://logowik.com/content/uploads/images/breville-kitchen-appliances2738.logowik.com.webp",
  },
  {
    name: "Jura",
    image: "https://brandlogos.net/wp-content/uploads/2022/10/jura-logo_brandlogos.net_cquzu-512x512.png",
  },
  {
    name: "Gaggia",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/53/Gaggia_logo.svg",
  },
  {
    name: "Rancilio",
    image: "https://cdn.worldvectorlogo.com/logos/rancilio.svg",
  },
]

export function Partners() {
  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">UkCoffeeHub Trusted Partners</h2>
        <div className="relative">
          <div className="flex lg:hidden overflow-hidden">
            <div className="flex animate-scroll" style={{ animationDuration: "15s" }}>
              {[...partners, ...partners].map((partner, index) => (
                <div key={`${partner.name}-${index}`} className="flex-shrink-0 w-[200px] mx-4">
                  <div className="relative w-[200px] h-[100px]">
                    <Image
                      src={partner.image || "/placeholder.svg"}
                      alt={`${partner.name} logo`}
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:grid lg:grid-cols-5 gap-8">
            {partners.map((partner) => (
              <div key={partner.name} className="flex items-center justify-center p-4">
                <div className="relative w-[200px] h-[100px]">
                  <Image
                    src={partner.image || "/placeholder.svg"}
                    alt={`${partner.name} logo`}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

