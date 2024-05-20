import { Divider, Stack } from '@mui/material';
import Landing from '../components/Landing';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Team from '../components/Team';
import Contact from '../components/Contact';
import { useEffect, useRef } from 'react';
import { useLoading } from '../shared';


export default function Home() {
  const readmore = useRef(null);
  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: "smooth"
    })
  }
  return(
    <Stack>
      <Landing readmore={readmore} scrollToSection={scrollToSection} />
      <Divider />
      <Features readmore={readmore} />
      <Divider />
      <HowItWorks />
      <Divider />
      <Team />
      <Divider />
      <Contact />
    </Stack>
  )
}