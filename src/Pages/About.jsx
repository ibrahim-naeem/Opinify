import React from "react";
import { motion } from "framer-motion";

function About() {
  return (
    <div className="flex flex-col items-center justify-center py-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="my-10 w-[90vw] lg:w-[70vw] shadow-2xl text-heading bg-gradient-to-t from-white to-transparent rounded-2xl text-center py-10 px-6"
      >
        <h1 className="font-extrabold text-2xl mb-6">
          Our Mission: To Protect and Empower{" "}
        </h1>
        At scamsnoop we believe that everyone has the right to transact and
        communicate online without fear of being defrauded. We are a dedicated
        team of activists, researchers, and digital citizens who have witnessed
        the devastating impact of scams firsthand. Our platform was born from a
        simple idea
        <span className="font-bold text-lg">
          `what if we could fight back together?`
        </span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className=" w-[90vw] lg:w-[70vw] shadow-2xl text-white bg-heading rounded-2xl text-center py-10 px-6"
      >
        <h1 className="font-extrabold text-2xl mb-6">
          The Problem: A Landscape of Deception
        </h1>
        Scammers operate in the shadows, relying on silence and isolation. They
        target victims across countless platforms—social media, marketplaces,
        dating apps, and investment portals—and then disappear, only to reappear
        under a new alias. Traditional reporting often feels futile, and
        warnings are too fragmented to make a difference. This leaves everyone
        vulnerable to the same repeated schemes.
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="my-10  w-[90vw] lg:w-[70vw] shadow-2xl text-heading bg-gradient-to-t from-white to-transparent rounded-2xl text-center py-10 px-6"
      >
        <h1 className="font-extrabold text-2xl mb-6">
          Our Solution: Collective Vigilance
        </h1>
        We provide a powerful, centralized shield against this threat.
        <span className="font-bold text-lg"> Scamsnoop</span> is more than just
        a database; its a community-powered defense network. We give people the
        tools to
        <span className="font-bold text-lg"> EXPOSE </span>
        scammers by documenting their methods, aliases, and patterns in a
        permanent, searchable record.
        <span className="font-bold text-lg"> VERIFY </span>
        identities before engaging in any transaction or sharing sensitive
        information.
        <span className="font-bold text-lg"> PROTECT </span>
        others by turning individual bad experiences into a collective
        early-warning system. Every report filed, every profile searched, and
        every scammer exposed makes the digital world safer for all of us.
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="my-10  w-[90vw] lg:w-[70vw] shadow-2xl bg-heading text-white rounded-2xl text-center py-10 px-6"
      >
        <h1 className="font-extrabold text-2xl mb-6">
          How We Build Trust (Our Core Values)
        </h1>
        <span className="font-bold text-lg"> Accuracy & Evidence</span> We are
        not a platform for gossip or defamation. Our system is built on
        verifiable evidence, transaction IDs, chat logs, and consistent patterns
        of behavior. We focus on facts to ensure the integrity of our database.
        <span className="font-bold text-lg"> Community-Driven </span>
        Our strength comes from our users. By sharing your experiences, you are
        not just seeking justice for yourself; you are becoming a protector for
        countless others.
        <span className="font-bold text-lg"> Victim Support </span>
        We understand the shame and anger that follows a scam. We offer a
        supportive, anonymous space to report fraud without judgment. Here, you
        are not a victim; you are a whistleblower.
        <span className="font-bold text-lg"> Relentless Advocacy </span>
        We are constantly working to improve our platform, educate the public on
        new scam tactics, and advocate for a safer internet for everyone.
      </motion.div>
    </div>
  );
}

export default About;
