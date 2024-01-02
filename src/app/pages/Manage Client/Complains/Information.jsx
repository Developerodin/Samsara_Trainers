import { Box, Button, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import { GenralTabel } from "../../../TabelComponents/GenralTable";
import axios from "axios";
import { BASE_URL } from "../../../Config/BaseUrl";
import AddIcon from "@mui/icons-material/Add";
import { InformationCard } from "../../../Components/InformationCard";
const Information = () => {
  const Data = [
    {
      title: "Raja Yoga",
      Img: "https://img.freepik.com/premium-photo/woman-doing-yoga-beach-with-mountain-background_865967-25537.jpg",
      description: `Meaning: ‘Royal’, ‘Chief’ or ‘King’, alluding to being the ‘best’ or
    ‘highest’ form of yoga. Closely linked to Patanjali’s Eight Fold Path
    of Yoga, Raja yoga is also known as ‘Classical Yoga’. This path is
    precise and contemplative. It aims to ‘control’ the intellect and
    thoughts through meditation. A connection with ‘God’ or
    ‘consciousness’ is worked towards by un-identifying with the ego-based
    self and identifying with the universal true Self. As a primarily
    interior practice with little outward spiritual expression, it is
    thought that Raja yoga requires much self-discipline.`,
    },
    {
      title: "Jnana yoga",
      Img: "https://www.brettlarkin.com/wp-content/uploads/2020/07/warrior-2_1-12-1-scaled.jpg",
      description: `Meaning: Wisdom or knowledge. This is the yoga of ‘knowing’, of realising the truth of oneself. First mentioned around 400BC, this is thought of as one of the most direct paths to insight and illumination, but also as one of the most difficult. Priests and scholars are most likely to be considered Jnana yogis through their practise of constant inquiry. Study of philosophical and yogic texts, along with discrimination and inquiry are the ways these practitioners understand the depths of the body, mind and spirit`,
    },
    {
      title: "Tantra yoga",
      Img: "https://yogavimoksha.com/wp-content/uploads/2019/05/Vimoksha-Kundalini-yoga-min.jpg",
      description: `Meaning: The root word of Tantra is ‘Tan’ meaning ‘to expand’ or ‘to weave’. It explores all aspects, sensations and energies that weave through the body and mind and actually began as a religion around 500BC. For over 1000 years it was the primary belief system of India in its less extreme forms and is the first time the physicality of the human body started to become important within a yogic context. Before this, much of a yoga practice was based upon worship, visualisation and meditation.

      Many people confuse Tantric yoga with ‘spiritualised sex’ – however, this isn’t the case. Whilst Tantra yoga includes many rituals, the ritualistic act of fornication is only reserved for a very rare ceremony for certain people. The fact that this branch of yoga permits mindful, purposeful and meaningful sex as opposed to no sex at all is probably why it has come to be known in such a way. Much of Tantra is kept in obscurity, with the practices and rituals passed along secretively through oral tradition from guru to shishya (‘student’ or ‘disciple’).`,
    },
    {
      title: "Hatha yoga",
      Img: "https://shawellness.com/shamagazine/wp-content/uploads/2015/03/hatha-yoga-vs.-bikram-yoga.jpg",
      description: `Meaning: ‘The Yoga of Force’. Many teachers equate Ha to mean ‘Sun’ and Tha to mean moon, and reason that the physical yoga practice is intended to ‘balance’ the Sun and Moon energies within us. Whilst the physical yoga practice is intended to bring about a state of equilibrium within the human organism, the real meaning and essence of Hatha yoga is to change the physical body and mind by way of experimentation, movement and physical ‘force’. 

      Hatha yoga is anything that uses the physical body. It is what you are most likely to practise in class in some form, whether it’s called Hatha yoga, Vinyasa yoga, Power yoga or any of the other many styles of physical yoga. First mentioned and practised around 1100AD, it is the most ‘modern’ branch of yoga. This branch of yoga is – in a way – actually derived from Tantra and the most widely celebrated ‘inventor’ of Hatha Yoga is Gorakshanath, who is considered a Maha-Yogi, or ‘great Yogi’. `,
    },
    {
      title: "Bhakti yoga",
      Img: "https://www.templepurohit.com/wp-content/uploads/2016/04/What-is-Bhakti-Yoga-Understanding-the-Path-of-Bhakti-Yoga.jpg",
      description: `Meaning: Devotion. First mentioned in The Bhagavad Gita around 300BC, the word Bhakti comes from the root word ‘Bhaj’, of which the essence is ‘to share’. This form of yoga is based upon the heart, love and devotion towards a chosen deity (Ishta Devata). Much like Karma yoga, dedicating all actions towards a deity or ‘God’ is an intrinsic part of Bhakti yoga. Much like other branches of yoga, Bhakti yoga has limbs (anga) for each practitioner to adhere to and take part in: 

      Shravana’; or ‘listening’ to sacred scriptures
      ‘Kirtana’; ‘singing’ of devotional songs
      ‘Smarana’; ‘remembering’ the divine through meditation 
      ‘Pada-sevana’; ritual worship or ‘service at the feet of the Lord’ 
      ‘Vandana’; ‘prostration’ before the image of God; 
      ‘Dasya’; ‘slavish’ devotion to the Lord 
      ‘Sakhya’; ‘friendship’ through which the Divine raises the devotee to the status of a ‘friend’
      ‘Atma-nivedana’; ‘self-offering’.  `,
    },
    {
      title: "Karma yoga",
      Img: "https://assets.thehansindia.com/h-upload/2022/12/31/1327889-yoga.webp",
      description: `Meaning: The Yoga of Action, also contemporarily known as the ‘Religion of Love’. The word ‘Karma’ in this context is derived from the root verb ‘Kri’ meaning ‘to do’. First mentioned around 300BC, this form of yoga is the main focus of the Bhagavad Gita. Karma yoga is based upon selfless service and acting without expectation of benefitting. It occupies a large part of Indian thought and through this practice, union with ‘the divine’ is achieved through making any action an offering to God. 

      Karma yoga suggests that we relinquish attachment to the consequences of our actions and instead focus on the moment in action. Awareness of each thought, word and deed and mindfulness are an important part of Karma yoga, which allows the practitioner to truly experience that moment-in-action. Through the practise of Karma yoga, yogis work and act to benefit the people and the world around them in order to contribute towards facilitating a unified and ‘enlightened’ world. `,
    },
  ];
  return (
    <Box>
      {Data.map((el, index) => {
        return (
          <Box key={index} sx={{ marginTop: "30px" }}>
            <InformationCard Data={el} />
          </Box>
        );
      })}
    </Box>
  );
};

export default Information;
