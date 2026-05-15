import React, { JSX } from 'react';
import {
  NextImage as ContentSdkImage,
  RichText as ContentSdkRichText,
  Field,
  ImageField,
  Link,
  LinkField,
  RichTextField,
  Text,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import clsx from 'clsx';
import { HeroCardFlags } from '@/types/styleFlags';

interface Fields {
  BackgroundImage: ImageField;
  SecondaryImage: ImageField;
  Title: Field<string>;
  Text: RichTextField;
  Link: LinkField;
}

export type HeroCardProps = ComponentProps & {
  params: { [key: string]: string };
  fields: Fields;
};

const Triangles = ({ styles }: { styles?: string }) => {
  const hideTop = styles?.includes(HeroCardFlags.HideTopTriangle);
  const hideBottom = styles?.includes(HeroCardFlags.HideBottomTriangle);
  return (
    <>
      {!hideTop && (
        <div
          className="bg-accent pointer-events-none absolute top-0 left-0 z-20 h-[min(18vw,8rem)] w-[min(55vw,28rem)]"
          style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
          aria-hidden
        />
      )}
      {!hideBottom && (
        <div
          className="bg-accent pointer-events-none absolute right-0 bottom-0 z-20 h-[min(18vw,8rem)] w-[min(55vw,28rem)]"
          style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}
          aria-hidden
        />
      )}
    </>
  );
};

const HeroCardBody = (props: HeroCardProps) => {
  const { page } = useSitecore();
  const { isEditing } = page.mode;

  return (
    <div className="space-y-5">
      {(props.fields.Title?.value || isEditing) && (
        <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
          <Text field={props.fields.Title} />
        </h2>
      )}
      {(props.fields.Text?.value || isEditing) && (
        <div className="text-foreground-light [&_a]:text-background max-w-prose text-lg [&_a]:underline">
          <ContentSdkRichText field={props.fields.Text} />
        </div>
      )}
      {(props.fields.Link?.value?.href || isEditing) && (
        <Link field={props.fields.Link} className="arrow-btn" />
      )}
    </div>
  );
};

const HeroCardSection = (props: HeroCardProps & { layout: React.ReactNode }): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const { isEditing } = page.mode;
  const showBg =
    props.fields.BackgroundImage?.value?.src ||
    props.fields.BackgroundImage?.value?.id ||
    isEditing;

  return (
    <section className={clsx('relative overflow-hidden', props.params.styles)} id={id || undefined}>
      {showBg && (
        <div className="absolute inset-0">
          <ContentSdkImage
            field={props.fields.BackgroundImage}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" aria-hidden />
        </div>
      )}
      <Triangles styles={props.params.styles} />
      <div className="text-background relative z-10 container py-16 md:py-24">{props.layout}</div>
    </section>
  );
};

export const Default = (props: HeroCardProps): JSX.Element => (
  <HeroCardSection
    {...props}
    layout={
      <div className="mx-auto max-w-2xl text-center">
        <HeroCardBody {...props} />
      </div>
    }
  />
);

export const TextRightCenter = (props: HeroCardProps): JSX.Element => (
  <HeroCardSection
    {...props}
    layout={
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-0">
        <div className="hidden md:block" aria-hidden />
        <div className="md:justify-self-end md:pr-6 lg:pr-12">
          <div className="max-w-lg text-left">
            <HeroCardBody {...props} />
          </div>
        </div>
      </div>
    }
  />
);

export const TextLeftCenter = (props: HeroCardProps): JSX.Element => (
  <HeroCardSection
    {...props}
    layout={
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-0">
        <div className="md:justify-self-start md:pl-6 lg:pl-12">
          <div className="max-w-lg text-left">
            <HeroCardBody {...props} />
          </div>
        </div>
        <div className="hidden md:block" aria-hidden />
      </div>
    }
  />
);

export const TextAndImage = (props: HeroCardProps): JSX.Element => {
  const { page } = useSitecore();
  const { isEditing } = page.mode;
  const showSecondary =
    props.fields.SecondaryImage?.value?.src || props.fields.SecondaryImage?.value?.id || isEditing;

  return (
    <HeroCardSection
      {...props}
      layout={
        <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12">
          <HeroCardBody {...props} />
          {showSecondary && (
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl">
              <ContentSdkImage
                field={props.fields.SecondaryImage}
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </div>
      }
    />
  );
};
