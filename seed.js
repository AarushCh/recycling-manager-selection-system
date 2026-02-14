import { faker } from '@faker-js/faker';
import fs from 'fs';

const generateData = () => {
    const candidates = [];
    const evaluations = [];

    for (let i = 1; i <= 40; i++) {
        // 1. Generate Candidate
        const candidate = {
            id: i,
            name: faker.person.fullName(),
            experience_years: faker.number.int({ min: 2, max: 15 }),
            skills: faker.helpers.arrayElements(
                ['Six Sigma', 'OSHA Certified', 'Lean Manufacturing', 'Team Leadership', 'Waste Management', 'Supply Chain'],
                { min: 2, max: 4 }
            ),
            avatar: faker.image.avatar()
        };
        candidates.push(candidate);

        // 2. Generate Mock AI Scores
        const crisis = faker.number.float({ min: 60, max: 98, fractionDigits: 1 });
        const sustainability = faker.number.float({ min: 50, max: 99, fractionDigits: 1 });
        const motivation = faker.number.float({ min: 70, max: 100, fractionDigits: 1 });

        evaluations.push({
            id: i,
            candidate_id: i,
            crisis_management_score: crisis,
            sustainability_score: sustainability,
            team_motivation_score: motivation,
            total_score: ((crisis + sustainability + motivation) / 3).toFixed(1)
        });
    }

    return { candidates, evaluations };
};

const data = generateData();
fs.writeFileSync('mockData.json', JSON.stringify(data, null, 2));
console.log("✅ Success! Generated 40 candidates in mockData.json");