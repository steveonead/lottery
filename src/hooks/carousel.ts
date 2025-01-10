import type { CarouselApi } from '@/components/ui/carousel';

import { useEffect, useState } from 'react';

const config = {
  loop: true,
  watchDrag: false,
  duration: 20,
};

export function useCarousel() {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) {
      return;
    }

    function onSelectHandler(api: CarouselApi) {
      const idx = api?.selectedScrollSnap() || 0;
      onSelect(idx);
    }

    api.on('slidesInView', onSelectHandler);

    return () => {
      api.off('slidesInView', onSelectHandler);
    };
  }, [api, onSelect]);

  return {
    api,
    setApi,
    config,
  };
}
