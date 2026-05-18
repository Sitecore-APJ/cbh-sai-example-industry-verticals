import {
  Field,
  ImageField,
  LinkField,
  NextImage as ContentSdkImage,
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
  useSitecore,
  Link,
} from '@sitecore-content-sdk/nextjs';

import { ComponentProps } from '@/lib/component-props';

interface Fields {
  BackgroundImage: ImageField;
  Video: ImageField;
  PromoImage: ImageField;
  Title: Field<string>;
  Text: Field<string>;
  CtaLink: LinkField;
}

export interface HeroCardProps extends ComponentProps {
  fields: Fields;
}

const HeroCardCommon = ({
  params,
  fields,
  children,
}: HeroCardProps & {
  children: React.ReactNode;
}) => {
  const { page } = useSitecore();
  const { styles, RenderingIdentifier: id } = params;
  const isPageEditing = page.mode.isEditing;
  // const hideTopTriangle = styles?.includes(HeroCardFlags.HideTopTriangle);

  if (!fields) {
    return isPageEditing ? (
      <div className={`component hero-banner ${styles}`} id={id}>
        [HERO BANNER]
      </div>
    ) : (
      <></>
    );
  }

  return (
    <div
      className={`component hero-promo ${styles} items-cente bg-red relative mt-[-20px] flex`}
      id={id}
    >
      {/* Background Media */}

      <div className="absolute inset-0 z-0">
        {!isPageEditing && fields?.Video?.value?.src ? (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={fields.BackgroundImage?.value?.src}
          >
            <source src={fields.Video?.value?.src} type="video/webm" />
          </video>
        ) : (
          <>
            <ContentSdkImage
              field={fields.BackgroundImage}
              className="h-full w-full object-cover md:object-bottom"
              priority
            />
          </>
        )}
      </div>

      {children}
    </div>
  );
};

export const Default = ({ params, fields, rendering }: HeroCardProps) => {
  return (
    <HeroCardCommon params={params} fields={fields} rendering={rendering}>
      {/* Content Container */}
      <div className="z-10 flex h-[600px] w-full justify-center">
        <div className="absolute top-1/2 left-1/2 w-md -translate-x-1/2 -translate-y-1/2 flex-wrap justify-center bg-white">
          <div className="flex flex-col items-center px-12 pt-9 pb-12 text-center">
            {/* <div className={clsx({ shim: screenLayer })}> */}
            {/* Title */}
            <h1 className="text-center text-3xl leading-[110%] font-bold capitalize md:text-[40px] md:leading-[130%] lg:text-left xl:text-[40px]">
              <ContentSdkText field={fields.Title} />
            </h1>

            {/* Text */}
            <div className="mt-7 text-xl md:text-2xl">
              <ContentSdkRichText field={fields.Text} className="text-center! lg:text-left" />
            </div>

            {/* CTA Link */}
            <div className="mt-6 flex justify-center lg:justify-start">
              <Link field={fields.CtaLink} className="arrow-btn" />
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </HeroCardCommon>
  );
};

export const TextLeft = ({ params, fields, rendering }: HeroCardProps) => (
  <HeroCardCommon params={params} fields={fields} rendering={rendering}>
    {/* Content Container */}
    <div className="z-10 flex h-[600px] w-full justify-center">
      <div className="absolute top-1/2 right-1/2 w-md -translate-y-1/2 flex-wrap justify-center bg-white">
        <div className="flex flex-col px-12 pt-9 pb-12">
          <h1 className="text-3xl leading-[110%] font-bold capitalize md:text-[40px] md:leading-[130%] lg:text-left xl:text-[40px]">
            <ContentSdkText field={fields.Title} />
          </h1>

          <div className="mt-7 text-xl md:text-2xl">
            <ContentSdkRichText field={fields.Text} className="lg:text-left" />
          </div>

          <div className="mt-6 flex justify-center lg:justify-start">
            <Link field={fields.CtaLink} className="arrow-btn" />
          </div>
        </div>
      </div>
    </div>
  </HeroCardCommon>
);

export const TextRight = ({ params, fields, rendering }: HeroCardProps) => (
  <HeroCardCommon params={params} fields={fields} rendering={rendering}>
    {/* Content Container */}
    <div className="z-10 flex h-[600px] w-full justify-center">
      <div className="absolute top-1/2 left-1/2 w-md -translate-y-1/2 flex-wrap justify-center bg-white">
        <div className="flex flex-col px-12 pt-9 pb-12">
          <h1 className="text-3xl leading-[110%] font-bold capitalize md:text-[40px] md:leading-[130%] lg:text-left xl:text-[40px]">
            <ContentSdkText field={fields.Title} />
          </h1>

          <div className="mt-7 text-xl md:text-2xl">
            <ContentSdkRichText field={fields.Text} className="lg:text-left" />
          </div>

          <div className="mt-6 flex justify-center lg:justify-start">
            <Link field={fields.CtaLink} className="arrow-btn" />
          </div>
        </div>
      </div>
    </div>
  </HeroCardCommon>
);

export const TextWithImage = ({ params, fields, rendering }: HeroCardProps) => (
  <HeroCardCommon params={params} fields={fields} rendering={rendering}>
    {/* Content Container */}
    <div className="z-10 flex min-h-[600px] w-full items-center justify-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white">
        <div className="relative flex">
          <div className="flex w-md flex-col px-12 pt-9 pb-12">
            <h1 className="text-3xl leading-[110%] font-bold capitalize md:text-[40px] md:leading-[130%] lg:text-left xl:text-[40px]">
              <ContentSdkText field={fields.Title} />
            </h1>

            <div className="mt-7 text-xl md:text-2xl">
              <ContentSdkRichText field={fields.Text} className="lg:text-left" />
            </div>

            <div className="mt-6 flex justify-center lg:justify-start">
              <Link field={fields.CtaLink} className="arrow-btn" />
            </div>
          </div>
          <div className="w-md shrink-0" aria-hidden />
          <div className="absolute top-0 right-0 h-full w-md overflow-hidden">
            <ContentSdkImage field={fields.PromoImage} className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  </HeroCardCommon>
);
