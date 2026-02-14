// App.jsx
import React, { useState, useEffect } from 'react';
import { MantineProvider, Container, Title, Grid, Card, Text, Badge, Group, Table, Progress, Button } from '@mantine/core';
import mockData from './mockData.json'; // The file we generated in Step 3

function App() {
    const [candidates, setCandidates] = useState([]);

    // Merge candidates with their evaluation scores for display
    useEffect(() => {
        const mergedData = mockData.candidates.map(c => {
            const evalData = mockData.evaluations.find(e => e.candidate_id === c.id);
            return { ...c, ...evalData };
        });
        // Sort by Total Score (Descending) for Leaderboard
        setCandidates(mergedData.sort((a, b) => b.total_score - a.total_score));
    }, []);

    return (
        <MantineProvider>

            <Container size="xl" py="xl">
                <Title order={1} mb="xs" className="title-gradient">♻️ Production Line Manager Selection</Title>
                <Text ta="center" size="lg" c="dimmed" mb="xl" fw={500}>AI-Powered Candidate Scoring & Analysis Dashboard</Text>

                <Grid>
                    {/* SECTION 1: LEADERBOARD (Top 10)  */}
                    <Grid.Col span={12} md={8}>
                        <Card shadow="sm" p="lg" radius="md" withBorder className="glass-card">
                            <Title order={3} mb="md">🏆 Top 10 Leaderboard</Title>
                            <Table striped highlightOnHover withTableBorder withColumnBorders>
                                <Table.Thead>
                                    <Table.Tr>
                                        <Table.Th>Rank</Table.Th>
                                        <Table.Th>Name</Table.Th>
                                        <Table.Th>Exp (Yrs)</Table.Th>
                                        <Table.Th>Crisis Mgmt</Table.Th>
                                        <Table.Th>Sustainability</Table.Th>
                                        <Table.Th>Motivation</Table.Th>
                                        <Table.Th>Total Score</Table.Th>
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody>
                                    {candidates.slice(0, 10).map((c, index) => (
                                        <Table.Tr key={c.id}>
                                            <Table.Td>#{index + 1}</Table.Td>
                                            <Table.Td>{c.name}</Table.Td>
                                            <Table.Td>{c.experience_years}</Table.Td>
                                            <Table.Td>{c.crisis_management_score}</Table.Td>
                                            <Table.Td>{c.sustainability_score}</Table.Td>
                                            <Table.Td>{c.team_motivation_score}</Table.Td>
                                            <Table.Td><Badge size="lg" color="green">{c.total_score}</Badge></Table.Td>
                                        </Table.Tr>
                                    ))}
                                </Table.Tbody>
                            </Table>
                        </Card>
                    </Grid.Col>

                    {/* SECTION 2: SKILL HEATMAP VISUALIZATION  */}
                    <Grid.Col span={12} md={4}>
                        <Card shadow="sm" p="lg" radius="md" withBorder className="glass-card">
                            <Title order={3} mb="md">📊 Skill Breakdown</Title>
                            <Text size="sm" c="dimmed" mb="md">
                                Average performance across top candidates
                            </Text>

                            {/* Visualizing scores as Progress bars (Heatmap alternative) */}
                            <Text size="xs" fw={700} mt="xs">Crisis Management</Text>
                            <Progress value={85} color="red" size="xl" radius="xl" />
                            <Text size="xs" align="right" mt={4}>85%</Text>

                            <Text size="xs" fw={700} mt="xs">Sustainability</Text>
                            <Progress value={92} color="teal" size="xl" radius="xl" />
                            <Text size="xs" align="right" mt={4}>92%</Text>

                            <Text size="xs" fw={700} mt="xs">Team Motivation</Text>
                            <Progress value={76} color="blue" size="xl" radius="xl" />
                            <Text size="xs" align="right" mt={4}>76%</Text>
                        </Card>
                    </Grid.Col>

                    {/* SECTION 3: CANDIDATE CARDS  */}
                    <Grid.Col span={12}>
                        <Title order={2} mt="xl" mb="md">Candidate Profiles</Title>
                        <Grid>
                            {candidates.slice(0, 6).map(c => ( // Showing first 6 for demo
                                <Grid.Col span={12} sm={6} md={4} key={c.id}>
                                    <Card shadow="sm" p="lg" radius="md" withBorder className="glass-card hover-scale">
                                        <Group justify="space-between" mb="xs">
                                            <Text fw={500}>{c.name}</Text>
                                            <Badge color="pink" variant="light">Score: {c.total_score}</Badge>
                                        </Group>

                                        <Text size="sm" c="dimmed" mb="md">
                                            Experience: {c.experience_years} Years
                                        </Text>

                                        <Group gap={5} mb="md">
                                            {c.skills.map((skill, idx) => (
                                                <Badge key={idx} size="xs" variant="outline">{skill}</Badge>
                                            ))}
                                        </Group>

                                        {/* Bonus: Share Button [cite: 42] */}
                                        <Button
                                            variant="light"
                                            color="blue"
                                            fullWidth
                                            mt="md"
                                            radius="md"
                                            onClick={() => {
                                                alert(`Shared profile of ${c.name} with HR department!`);
                                            }}
                                        >
                                            Share Candidate
                                        </Button>
                                    </Card>
                                </Grid.Col>
                            ))}

                        </Grid>
                    </Grid.Col>
                </Grid>
            </Container>
        </MantineProvider>
    );
}

export default App;