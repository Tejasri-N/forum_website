import {React,useRef} from "react";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

function About() {
  const container = useRef();
  useGSAP(
    () => {
      gsap.from('.sub_head', { 
          duration: 2,
          x: "50",
          delay:0.5,
          opacity: 0,
          scrollTrigger:{
            trigger: '.sub_head',
            start: 'top 80%',
            end: 'top 30%',
            scrub: 1,
          }
        });
        gsap.from('.head', { 
          duration: 2,
          y: "50",
          delay:0.5,
          opacity: 0,
          scrollTrigger:'.head',
        });
    },
    { scope: container }
  ); 



  return (
    <div ref={container} className="bg-custom-body-bg h-max font-rosario
      dark:bg-black dark:text-white" >
      <div className="head flex justify-center font-roboto text-7xl p-4" id="title">About Us</div>
      <div className="p-4 text-2xl">
        <p className="start py-2">
          At <b>Data in Your Hands</b>, we are dedicated to providing a comprehensive platform where students and parents can seek and share knowledge regarding IIT-JEE counselling. Whether you're navigating the complexities of the admission process, choosing the right college, or understanding the nuances of seat allocation, our community is here to help.
        </p>
        <div id="mission" className="sub_head text-4xl font-roboto pt-4 pb-2">Our Mission</div> 
        <p className="start py-2">
          Our mission is to empower students and their families by providing accurate, reliable, and up-to-date information about IIT-JEE counselling. We believe in the power of collective wisdom and aim to create a supportive community where everyone can contribute and benefit.
        </p>
        <div id="offer" className="sub_head text-4xl font-roboto pt-4 pb-2">What We Offer</div> 
        <div className="p-4">
          <li className="p-1">Community Support: Connect with peers who are in the same boat. Share your experiences, ask questions, and support each other through the challenging journey of IIT-JEE counselling.</li>
          <li className="p-1">Comprehensive Resources: Access a wide range of resources, including articles, FAQs, and step-by-step guides, to help you understand every aspect of the counselling process.</li>
        </div>
        <div id="choose" className="sub_head text-4xl font-roboto pt-4 pb-2">Why Choose Us?</div> 
        <div className="p-4">
            <li className="p-1">Reliability: We ensure that the information shared on our platform is accurate and verified by experts in the field.</li>
            <li className="p-1">Community Driven: Our platform thrives on the contributions of its members. Your questions, answers, and shared experiences are what make Data in Your Hands a valuable resource.</li>
            <li className="p-1">Accessibility: Whether you're a student, parent, or educator, our platform is designed to be user-friendly and accessible to everyone.</li>
        </div>
        <div id="join" className="sub_head text-4xl font-roboto pt-4 pb-2">Join Us</div>
        <p className="start py-2">
          Become a part of Data in Your Hands today and take control of your IIT-JEE counselling journey. Whether you have questions or answers, your participation makes our community stronger. Together, we can demystify the IIT-JEE counselling process and help each other succeed.
        </p> 
        <br/>
        <div id="guideliness" className="sub_head text-4xl font-roboto pt-4 pb-2">Community Guideliness</div>
        <p className="start py-2">At Data in Your Hands, we aim to maintain a respectful and informative community. Please follow these guidelines:</p>
        <ol className="list-decimal mx-8">
          <li className="p-1"><b>Be Respectful:</b> Treat all members kindly. Avoid personal attacks or discriminatory remarks.</li>
          <li className="p-1"><b>Stay On Topic:</b> Focus on IIT-JEE counselling. Keep discussions relevant.</li>
          <li className="p-1"><b>Share Accurate Information:</b> Provide verified and accurate information. Cite credible sources when possible.</li>
          <li className="p-1"><b>No Spam or Self-Promotion: </b>Avoid posting spam or self-promotional content.</li>
          <li className="p-1"><b>Stay On Topic:</b> Do not share personal information. Respect the privacy of others.</li>
          <li className="p-1"><b>Use Clear Language:</b> Communicate clearly and respectfully. Avoid offensive language.</li>
          <li className="p-1"><b>Report Violations:</b> Report any content that violates these guidelines to the moderators.</li>
        </ol>
        <div id="policy" className="sub_head text-4xl font-roboto pt-4 pb-2">Moderation Policy:</div>
        <p className="start py-2">Violations may result in warnings, temporary suspensions, or permanent bans.</p>
        <br/>
        <p className="text-center"><b>Thank you for being a part of our community. Let's put the power of knowledge in your hands!</b></p>
        <p className="text-center font-bold">Data in Your Hands Team</p>
      </div>
    </div>
  );
}

export default About;