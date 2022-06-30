import { useEffect, useRef } from 'react';
import LocomotiveScroll, { LocomotiveScrollOptions, Scroll } from 'locomotive-scroll';
type UseLocomotiveScrollHook = [React.RefObject<Scroll>];

type Props = {
	ref: React.RefObject<Element>;
} & Omit<LocomotiveScrollOptions, 'el'>;

const useLocomotiveScroll = ({ ref, ...otherProps }: Props): UseLocomotiveScrollHook => {
	const locomotiveScrollRef = useRef<Scroll | null>(null);

	useEffect(() => {
		if (ref?.current) {
			import('locomotive-scroll').then((LocomotiveScroll) => {
				locomotiveScrollRef.current = new LocomotiveScroll.default({
					...otherProps,
					el: ref.current,
				});
			});
		}
		return () => {
			locomotiveScrollRef.current?.destroy();
		};
	}, [ref]);

	return [locomotiveScrollRef];
};

export default useLocomotiveScroll;
