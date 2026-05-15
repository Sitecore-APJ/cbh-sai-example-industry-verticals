import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  Default,
  TextAndImage,
  TextLeftCenter,
  TextRightCenter,
  HeroCardProps,
} from '../components/hero-card/HeroCard';
import { CommonParams, CommonRendering } from './common/commonData';
import {
  createImageField,
  createLinkField,
  createRichTextField,
  createTextField,
} from './helpers/createFields';
import {
  BackgroundColorArgs,
  backgroundColorArgTypes,
  defaultBackgroundColorArgs,
} from './common/commonControls';
import clsx from 'clsx';
import { HeroCardFlags } from '@/types/styleFlags';

type StoryProps = HeroCardProps &
  BackgroundColorArgs & {
    hideTopTriangle: boolean;
    hideBottomTriangle: boolean;
  };

const meta = {
  title: 'Page Content/Hero Card',
  component: Default,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    ...backgroundColorArgTypes,
    hideTopTriangle: {
      control: 'boolean',
      name: 'Hide top triangle',
    },
    hideBottomTriangle: {
      control: 'boolean',
      name: 'Hide bottom triangle',
    },
  },
  args: {
    hideTopTriangle: false,
    hideBottomTriangle: false,
    ...defaultBackgroundColorArgs,
  },
  tags: ['autodocs'],
} satisfies Meta<StoryProps>;
export default meta;

type Story = StoryObj<StoryProps>;

const baseParams = {
  ...CommonParams,
};

const baseRendering = {
  ...CommonRendering,
  componentName: 'HeroCard',
  params: baseParams,
};

const baseFields = {
  BackgroundImage: createImageField('placeholder'),
  SecondaryImage: createImageField('placeholder'),
  Title: createTextField('Growing with growers'),
  Text: createRichTextField(1, 'paragraphs'),
  Link: createLinkField('Learn more'),
};

const buildStyles = (args: StoryProps) =>
  clsx(
    baseParams.styles,
    args.BackgroundColor,
    args.hideTopTriangle && HeroCardFlags.HideTopTriangle,
    args.hideBottomTriangle && HeroCardFlags.HideBottomTriangle
  );

export const Centered: Story = {
  name: 'Default (centered)',
  render: (args) => {
    const params = { ...baseParams, styles: buildStyles(args) };
    return <Default params={params} rendering={baseRendering} fields={baseFields} />;
  },
};

export const PanelRightOfCenter: Story = {
  name: 'Text right of center',
  render: (args) => {
    const params = { ...baseParams, styles: buildStyles(args) };
    return <TextRightCenter params={params} rendering={baseRendering} fields={baseFields} />;
  },
};

export const PanelLeftOfCenter: Story = {
  name: 'Text left of center',
  render: (args) => {
    const params = { ...baseParams, styles: buildStyles(args) };
    return <TextLeftCenter params={params} rendering={baseRendering} fields={baseFields} />;
  },
};

export const TextWithSecondaryImage: Story = {
  name: 'Text and image',
  render: (args) => {
    const params = { ...baseParams, styles: buildStyles(args) };
    return <TextAndImage params={params} rendering={baseRendering} fields={baseFields} />;
  },
};
