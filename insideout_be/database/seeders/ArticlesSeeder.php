<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ArticlesSeeder extends Seeder
{
    public function run()
    {
        // Articles pour l'humeur 'happy'
        $happy_articles = [
            [
                'title' => 'The Power of Positive Thinking',
                'description' => 'Discover the power of positive thinking and how it can transform your life. Learn how to change your mindset and attract positivity into your life.',
                'image' => 'https://images.unsplash.com/photo-1535649393-17485557fd27',
                'mood' => 'happy',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'How to Keep a Positive Attitude Every Day',
                'description' => 'Maintaining a positive attitude daily is key to personal success. Explore practical ways to stay motivated and optimistic every day.',
                'image' => 'https://images.unsplash.com/photo-1485191193650-19d2fdbd4a63',
                'mood' => 'happy',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => '5 Ways to Practice Gratitude and Boost Your Mood',
                'description' => 'Practicing gratitude can improve mental health and increase happiness. Find out how gratitude can shift your mindset and lead to better well-being.',
                'image' => 'https://images.unsplash.com/photo-1506748686219-e373c9a51c88',
                'mood' => 'happy',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Creating a Life of Happiness and Fulfillment',
                'description' => 'Learn the habits and strategies that successful and happy people use to create a fulfilling life, both personally and professionally.',
                'image' => 'https://images.unsplash.com/photo-1494239388195-dcd13d6175ac',
                'mood' => 'happy',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'The Importance of Laughter in Mental Health',
                'description' => 'Laughter is not only enjoyable but also essential for mental health. Explore how laughter can reduce stress and improve your emotional well-being.',
                'image' => 'https://images.unsplash.com/photo-1501594907350-28a1a85b82da',
                'mood' => 'happy',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ];

        // Articles pour l'humeur 'sad'
        $sad_articles = [
            [
                'title' => 'Coping with Loss: A Guide to Healing',
                'description' => 'Losing someone is one of the hardest challenges in life. Learn coping strategies and steps toward healing and finding peace during a tough time.',
                'image' => 'https://images.unsplash.com/photo-1470089211900-c1a91a39c309',
                'mood' => 'sad',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Dealing with Heartbreak',
                'description' => 'Heartbreak can be overwhelming. This article offers practical advice on how to recover emotionally and rebuild your life after a difficult breakup.',
                'image' => 'https://images.unsplash.com/photo-1516248876961-f21e9457b582',
                'mood' => 'sad',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'How to Handle Stress and Anxiety After a Loss',
                'description' => 'Learn how to manage stress and anxiety after the loss of a loved one or a significant change. This guide provides helpful techniques for dealing with grief.',
                'image' => 'https://images.unsplash.com/photo-1483221300135-21f6de370c27',
                'mood' => 'sad',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Overcoming Sadness: Steps Towards Recovery',
                'description' => 'Sadness can be crippling, but it can be overcome. Find out how you can take small steps every day to get better and regain happiness.',
                'image' => 'https://images.unsplash.com/photo-1518659276371-0f15f83c2d79',
                'mood' => 'sad',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Finding Hope After Dark Times',
                'description' => 'Dark times can feel never-ending, but hope is always there. Explore ways to find hope even in the darkest of times and how to move forward.',
                'image' => 'https://images.unsplash.com/photo-1500377486872-bd12ba443a1a',
                'mood' => 'sad',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ];

        // Articles pour l'humeur 'angry'
        $angry_articles = [
            [
                'title' => 'Managing Anger: Techniques for Staying Calm',
                'description' => 'Anger is a natural emotion, but it needs to be controlled. Discover techniques to manage your anger and remain calm in stressful situations.',
                'image' => 'https://images.unsplash.com/photo-1532635063-2e5b79e5c9fa',
                'mood' => 'angry',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'The Science of Anger and How It Affects Your Body',
                'description' => 'Anger can have significant impacts on your physical health. Learn the science behind anger and how it affects your mind and body.',
                'image' => 'https://images.unsplash.com/photo-1519701294178-b1153c5c13f5',
                'mood' => 'angry',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Why Anger Can Be a Healthy Emotion',
                'description' => 'Anger isn’t always bad. In fact, it can help you set boundaries and stand up for yourself. Learn when anger can be a positive emotion.',
                'image' => 'https://images.unsplash.com/photo-1494835886742-3e8a888e8a1f',
                'mood' => 'angry',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'How to Use Meditation to Calm Your Anger',
                'description' => 'Meditation can help you manage and control your anger. This article explains the benefits of meditation in handling emotional responses.',
                'image' => 'https://images.unsplash.com/photo-1498227012204-e1b9900c3e92',
                'mood' => 'angry',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'The Link Between Frustration and Anger',
                'description' => 'Frustration often leads to anger. Understand the connection between these two emotions and how you can avoid triggering anger from frustration.',
                'image' => 'https://images.unsplash.com/photo-1512640262772-d3e6db3d2e50',
                'mood' => 'angry',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ];

        // Articles pour l'humeur 'anxious'
        $anxious_articles = [
            [
                'title' => 'How to Calm Your Anxiety: Tips for a Peaceful Mind',
                'description' => 'Anxiety can be overwhelming, but there are ways to manage it. Learn some practical tips to calm your mind and overcome anxiety.',
                'image' => 'https://images.unsplash.com/photo-1532635063-2e5b79e5c9fa',
                'mood' => 'anxious',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Understanding Anxiety: Causes and Solutions',
                'description' => 'Understanding anxiety is the first step toward managing it. Explore the causes of anxiety and discover ways to reduce its impact on your life.',
                'image' => 'https://images.unsplash.com/photo-1515630161415-3f2b9c32f3be',
                'mood' => 'anxious',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'The Role of Mindfulness in Overcoming Anxiety',
                'description' => 'Mindfulness has been proven to help with anxiety. Learn how to practice mindfulness and how it can significantly reduce anxious feelings.',
                'image' => 'https://images.unsplash.com/photo-1561948957-9e10b91a6884',
                'mood' => 'anxious',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Breathing Exercises to Calm Your Nerves',
                'description' => 'When anxiety strikes, breathing exercises can help. Find out how to use deep breathing techniques to calm your nerves and reduce stress.',
                'image' => 'https://images.unsplash.com/photo-1567390127-6abfa8744104',
                'mood' => 'anxious',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'How Exercise Helps to Relieve Anxiety',
                'description' => 'Exercise is not just good for the body, it also helps with anxiety. Explore the connection between physical activity and mental well-being.',
                'image' => 'https://images.unsplash.com/photo-1518709268807-3bcf9de1d24d',
                'mood' => 'anxious',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ];

        // Articles pour l'humeur 'bored'
        $bored_articles = [
            [
                'title' => '10 Fun Activities to Get Rid of Boredom',
                'description' => 'Boredom can be tough, but there are plenty of activities to try. From reading to exercising, here are 10 activities to help pass the time and boost your mood.',
                'image' => 'https://images.unsplash.com/photo-1523576632821-bb153d3158f9',
                'mood' => 'bored',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'How to Find Motivation When You’re Feeling Bored',
                'description' => 'Finding motivation during a bout of boredom can be challenging. Learn strategies to rekindle your energy and passion for life.',
                'image' => 'https://images.unsplash.com/photo-1502797070033-e5a7b5679415',
                'mood' => 'bored',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Creative Hobbies to Try When You’re Feeling Bored',
                'description' => 'Boredom often signals a need for creativity. Discover new hobbies that can engage your mind and fill your time with joy.',
                'image' => 'https://images.unsplash.com/photo-1464746554817-bd7dba1c71b3',
                'mood' => 'bored',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'How to Use Boredom to Your Advantage',
                'description' => 'Boredom isn’t always a negative emotion. Learn how to use boredom as an opportunity for reflection and creativity.',
                'image' => 'https://images.unsplash.com/photo-1496361261984-0b16f5730ca0',
                'mood' => 'bored',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'The Benefits of Taking a Break to Beat Boredom',
                'description' => 'Sometimes, the best way to fight boredom is to take a break. Learn how taking breaks can help improve focus and creativity.',
                'image' => 'https://images.unsplash.com/photo-1534921667549-1e4a66f9911e',
                'mood' => 'bored',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ];

        // Articles pour l'humeur 'shy'
// Articles pour l'humeur 'shy'
$shy_articles = [
    [
        'title' => 'Overcoming Shyness: How to Boost Your Confidence',
        'description' => 'Shyness can hold you back, but you can overcome it. Discover how to build confidence and social skills to feel more comfortable in social situations.',
        'image' => 'https://images.unsplash.com/photo-1520040601863-5483b6a6b74d',
        'mood' => 'shy',
        'created_at' => now(),
        'updated_at' => now(),
    ],
    [
        'title' => 'Building Self-Esteem for Shy People',
        'description' => 'Self-esteem plays a crucial role in overcoming shyness. Learn how to boost your self-esteem and develop a positive self-image.',
        'image' => 'https://images.unsplash.com/photo-1470292295394-b0c021f6d45d',
        'mood' => 'shy',
        'created_at' => now(),
        'updated_at' => now(),
    ],
    [
        'title' => 'How to Navigate Social Situations When You’re Shy',
        'description' => 'Social interactions can be intimidating for shy people. Discover effective strategies to navigate social situations and feel more confident.',
        'image' => 'https://images.unsplash.com/photo-1484680849022-982f5b87c518',
        'mood' => 'shy',
        'created_at' => now(),
        'updated_at' => now(),
    ],
    [
        'title' => 'Overcoming Social Anxiety',
        'description' => 'Social anxiety often goes hand-in-hand with shyness. Learn how to overcome social anxiety and interact with others with ease.',
        'image' => 'https://images.unsplash.com/photo-1490762513937-b06090e6f9ad',
        'mood' => 'shy',
        'created_at' => now(),
        'updated_at' => now(),
    ],
    [
        'title' => 'Building Confidence in Small Social Interactions',
        'description' => 'Start small to build your confidence. Learn how simple social interactions can help boost your self-esteem and reduce shyness.',
        'image' => 'https://images.unsplash.com/photo-1533272492112-9d51914c1c02',
        'mood' => 'shy',
        'created_at' => now(),
        'updated_at' => now(),
    ]
];

// Insertion des articles dans la base de données

        // Articles pour l'humeur 'afraid'
        $afraid_articles = [
    [
        'title' => 'When Fear Grips You: Understanding the Physical Symptoms of Fear',
        'description' => 'Fear isn’t just a feeling; it has physical manifestations. Learn about the common symptoms of fear and how to deal with them in a healthy way.',
        'image' => 'https://images.unsplash.com/photo-1569157783-6211296f79d1',
        'mood' => 'afraid',
        'created_at' => now(),
        'updated_at' => now(),
    ],
    [
        'title' => 'How to Overcome Your Fear of Failure',
        'description' => 'Fear of failure is something many people experience. This article provides practical strategies to turn that fear into motivation and growth.',
        'image' => 'https://images.unsplash.com/photo-1565616163-bb94fdfc8e4d',
        'mood' => 'afraid',
        'created_at' => now(),
        'updated_at' => now(),
    ],
    [
        'title' => 'Conquering Social Anxiety: Tips for Being Comfortable Around Others',
        'description' => 'Social anxiety can hold you back from connecting with others. Discover helpful techniques to manage this anxiety and feel more at ease in social situations.',
        'image' => 'https://images.unsplash.com/photo-1598353811790-d34ebd7ff4fa',
        'mood' => 'afraid',
        'created_at' => now(),
        'updated_at' => now(),
    ],
    [
        'title' => 'The Psychology Behind Fear: What Causes It and How to Overcome It',
        'description' => 'Explore the science behind fear, why it exists, and how we can use psychological techniques to reduce its hold on our lives.',
        'image' => 'https://images.unsplash.com/photo-1532615813770-033feb52862e',
        'mood' => 'afraid',
        'created_at' => now(),
        'updated_at' => now(),
    ],
    [
        'title' => 'Facing Your Fears: A Step-by-Step Guide to Conquering Anxiety',
        'description' => 'Confronting fear is a process. This article walks you through the steps needed to gradually face and reduce anxiety, bringing a sense of empowerment.',
        'image' => 'https://images.unsplash.com/photo-1526581110610-399e02999a60',
        'mood' => 'afraid',
        'created_at' => now(),
        'updated_at' => now(),
    ]
];


        // Insérer les articles dans la table 'articles'
        $articles = array_merge($happy_articles, $sad_articles, $angry_articles, $anxious_articles, $bored_articles, $shy_articles, $afraid_articles);
        
        foreach ($articles as $article) {
            DB::table('articles')->insert([
                'title' => $article['title'],
                'description' => $article['description'],
                'image' => $article['image'],
                'mood' => $article['mood'], // Remplacer `etat_id` par `mood`
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
        
    }
}
