const useGptCharacters = (location = false, match = false) => {
    const characters = {
        alice: {
            id: "4",
            gpt: '7',
            video_id: '29e627e',
            google_tts: location.state ? location.state.google_tts : '0',
            language_code: location.state ? location.state.language_code : 'en-US',
            language_name: location.state ? location.state.language_name : 'alice_v2',
            loop_video_url: require('../assets/video/alice_bw_loop_1.mp4'),
            character_name: 'Alice',
            speak_count: 15,
            inactivity_timeout_duration: 15000,
            given_your_name: "What is your name ?",
            welcome_message_prefix: "Welcome to Wonderland,",
            welcome_message_surfix: "! But what good is Wonderland without hearing or talking? Please enable your mic and sound.",
            type_your_name: "By what name shall Alice call you?",
            name_unavailability_title: "Welcome traveler! Would it be a bother if Alice calls you:",
            default_name: "Young Artist",
            end_of_interaction_response: true,
            inactivity_response_required: false,
            random_responses: [
                {
                    result_video_url: "https://apologia.ai/static/1b589ce.mp4",
                    text: "I must go now to chase the white rabbit.",
                    url: require('../assets/random1.wav')
                },
                {
                    result_video_url: "https://apologia.ai/static/9033777.mp4",
                    text: "I can't talk now, I think I've just seen the white rabbit.",
                    url: require('../assets/random2.wav')
                },
                {
                    result_video_url: "https://apologia.ai/static/998031c.mp4",
                    text: "Now, if you'll excuse me. I'm late for a date with the white rabbit.",
                    url: require('../assets/random3.wav')
                }
            ],
            inactivity_response: [
                {
                    result_video_url: "https://apologia.ai/static/60ba916.mp4",
                    text: "Silence is golden but talking is platinum. Care to go platinum with me?"
                },
                {
                    result_video_url: "https://apologia.ai/static/0d70928.mp4",
                    text: "Are you there God? It's me, Alice. Please tell me why this human won't talk to me."
                },
                {
                    result_video_url: "https://apologia.ai/static/37e7d4e.mp4",
                    text: "Dear diary, I was talking to this interesting human. But then they got scared and didn't respond."
                },
                {
                    result_video_url: "https://apologia.ai/static/31a03f4.mp4",
                    text: "I don't like silence. It's too loud for me."
                },
                {
                    result_video_url: "https://apologia.ai/static/be4d7d5.mp4",
                    text: "I don't like the quiet. I find my mind fills the expanse."
                },
                {
                    result_video_url: "https://apologia.ai/static/b33fa1d.mp4",
                    text: "The void of space and time extends out in all directions. Maybe the void will talk to me."
                },
                {
                    result_video_url: "https://apologia.ai/static/754d74b.mp4",
                    text: "I don't like to be alone with my thoughts. They're bad company."
                },
                {
                    result_video_url: "https://apologia.ai/static/d647c60.mp4",
                    text: "I'll take this break in our conversation to meditate. There, I've meditated. Ready to talk?"
                },
            ]
        },
        alice_v3: {
            id: "4",
            gpt: '7',
            video_id: '29e627e',
            google_tts: location.state ? location.state.google_tts : '0',
            language_code: location.state ? location.state.language_code : 'en-US',
            language_name: location.state ? location.state.language_name : 'alice_v2',
            loop_video_url: require('../assets/video/alice_bw_loop_1.mp4'),
            character_name: 'Alice',
            speak_count: 15,
            inactivity_timeout_duration: 15000,
            given_your_name: "What is your name ?",
            welcome_message_prefix: "Welcome to Wonderland,",
            welcome_message_surfix: "! But what good is Wonderland without hearing or talking? Please enable your mic and sound.",
            type_your_name: "By what name shall Alice call you?",
            name_unavailability_title: "Welcome traveler! Would it be a bother if Alice calls you:",
            default_name: "Young Artist",
            end_of_interaction_response: true,
            inactivity_response_required: true,
            random_responses: [
                {
                    result_video_url: "https://apologia.ai/static/1b589ce.mp4",
                    text: "I must go now to chase the white rabbit.",
                    url: require('../assets/random1.wav')
                },
                {
                    result_video_url: "https://apologia.ai/static/9033777.mp4",
                    text: "I can't talk now, I think I've just seen the white rabbit.",
                    url: require('../assets/random2.wav')
                },
                {
                    result_video_url: "https://apologia.ai/static/998031c.mp4",
                    text: "Now, if you'll excuse me. I'm late for a date with the white rabbit.",
                    url: require('../assets/random3.wav')
                }
            ],
            inactivity_response: [
                {
                    result_video_url: "https://apologia.ai/static/60ba916.mp4",
                    text: "Silence is golden but talking is platinum. Care to go platinum with me?"
                },
                {
                    result_video_url: "https://apologia.ai/static/0d70928.mp4",
                    text: "Are you there God? It's me, Alice. Please tell me why this human won't talk to me."
                },
                {
                    result_video_url: "https://apologia.ai/static/37e7d4e.mp4",
                    text: "Dear diary, I was talking to this interesting human. But then they got scared and didn't respond."
                },
                {
                    result_video_url: "https://apologia.ai/static/31a03f4.mp4",
                    text: "I don't like silence. It's too loud for me."
                },
                {
                    result_video_url: "https://apologia.ai/static/be4d7d5.mp4",
                    text: "I don't like the quiet. I find my mind fills the expanse."
                },
                {
                    result_video_url: "https://apologia.ai/static/b33fa1d.mp4",
                    text: "The void of space and time extends out in all directions. Maybe the void will talk to me."
                },
                {
                    result_video_url: "https://apologia.ai/static/754d74b.mp4",
                    text: "I don't like to be alone with my thoughts. They're bad company."
                },
                {
                    result_video_url: "https://apologia.ai/static/d647c60.mp4",
                    text: "I'll take this break in our conversation to meditate. There, I've meditated. Ready to talk?"
                },
            ]
        }
    }
    if (!location.state && (location.pathname === '/sothebys')) {
        return characters.alice;
    } else {
        return Object.values(characters)
    }
}

export default useGptCharacters;
