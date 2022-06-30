import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { TimelineDefinition } from '@motionone/dom/types/timeline/types';
import { timeline, animate, stagger } from 'motion';
import useLocomotiveScroll from '../hooks/useLocomotiveScroll';

const getSectionHeight = (el: HTMLUListElement) => {
	const { height } = el.getBoundingClientRect();
	console.log(height);
	const { childElementCount } = el;
	return height / childElementCount;
};

const Home: NextPage = () => {
	const scrollRef = useRef<HTMLDivElement | null>(null);
	const countRef = useRef<HTMLUListElement | null>(null);
	const countRef2 = useRef<HTMLUListElement | null>(null);
	const countListRef = useRef<HTMLDivElement | null>(null);
	const countListRef2 = useRef<HTMLDivElement | null>(null);
	const titleRef = useRef<HTMLHeadingElement | null>(null);
	const imageRef = useRef<HTMLImageElement | null>(null);
	const loaderRef = useRef<HTMLDivElement | null>(null);

	const [locomotiveRef] = useLocomotiveScroll({
		inertia: 0.6,
		ref: scrollRef,
		smooth: true,
		smoothMobile: true,
	});

	useEffect(() => {
		if (countRef.current && countRef2.current) {
			const transformAmount = getSectionHeight(countRef.current);

			const sequence1: TimelineDefinition = new Array(3).fill('').flatMap((_, idx) => [
				[countRef.current, { y: `-${transformAmount * (idx + 1)}px` }],
				[countRef2.current, { y: `-${transformAmount * (idx + 1)}px` }, { at: '-1.4' }],
				[countListRef.current, { y: `-${transformAmount * (idx + 1)}px` }, { at: '-1.4' }],
				[countListRef2.current, { y: `-${transformAmount * (idx + 1)}px` }, { at: '-1.4' }],
			]) as TimelineDefinition;

			timeline(sequence1, { defaultOptions: { duration: 1.5, easing: [0.76, 0, 0.24, 1] } });
		}
	}, []);

	useEffect(() => {
		const sequence2: TimelineDefinition = [
			[titleRef.current, { y: 100 }],
			[imageRef.current, { scale: 1.2 }, { at: '<' }],
			[countRef.current, { opacity: 0 }, { at: '<' }],
			[countRef2.current, { opacity: 0 }, { at: '<' }],
			[loaderRef.current, { y: '-100vh' }, { at: '-0.75' }],
			[titleRef.current, { y: 0 }, { at: '-0.75' }],
			[imageRef.current, { scale: 1 }, { at: '<' }],
		] as TimelineDefinition;

		timeline(sequence2, {
			defaultOptions: { easing: [0.76, 0, 0.24, 1], duration: 1.5, delay: 4.5 },
		});
	}, []);

	return (
		<>
			<Head>
				<title>Parallax with Locomotive Scroll & Motion One</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div className='loader-container' ref={loaderRef}>
				<div className='counter-container' ref={countListRef}>
					<ul className='counter-list' ref={countRef}>
						<li>
							<h3>2</h3>
						</li>
						<li>
							<h3>4</h3>
						</li>
						<li>
							<h3>6</h3>
						</li>
						<li>
							<h3>9</h3>
						</li>
					</ul>
				</div>
				<div className='counter-container' ref={countListRef2}>
					<ul className='counter-list' ref={countRef2}>
						<li>
							<h3>6</h3>
						</li>
						<li>
							<h3>2</h3>
						</li>
						<li>
							<h3>7</h3>
						</li>
						<li>
							<h3>8</h3>
						</li>
					</ul>
				</div>
			</div>
			<div className='site-wrapper' data-scroll-container ref={scrollRef}>
				<div className='hero-container'>
					<div className='hero-image' data-scroll data-scroll-speed='-8'>
						<img
							src='https://images.unsplash.com/photo-1533090161767-e6ffed986c88?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80'
							alt=''
							className='hero-actual-image'
							ref={imageRef}
						/>
					</div>
					<div className='hero-title' data-scroll data-scroll-speed='-5' data-scroll-position='top'>
						<h1 ref={titleRef}>Minimalism</h1>
					</div>
				</div>
				<div className='intro-container' data-scroll data-scroll-speed='0'>
					<div className='intro-text'>
						<h2 data-scroll data-scroll-speed='1'>
							Become a Minimalist
						</h2>
						<p data-scroll data-scroll-speed='2'>
							Minimalist living is the opposite of boring. It removes mundane activities that take away
							from spending time with our loved ones. Once we rid ourselves of the unnecessary, we&apos;re
							able to decide what will define our lives. Becoming minimalist frees us to live a bigger
							life with a more passionate pursuit of our greatest purpose and goals.
						</p>
					</div>
					<div className='intro-image'>
						<picture data-scroll data-scroll-speed='1'>
							<img
								src='https://images.unsplash.com/photo-1536059540012-f2ed455bc0b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80'
								alt=''
								data-scroll
								data-scroll-speed='-2'
							/>
						</picture>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
