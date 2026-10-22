import test from 'node:test';
import assert from 'node:assert/strict';

test('study progress calculation logic', () => {
  const mockChapter = {
    id: 1,
    sections: [
      {
        title: 'Section 1',
        subsections: [
          { subtitle: 'Sub 1', content: [] },
          { subtitle: 'Sub 2', content: [] },
        ]
      },
      {
        title: 'Section 2',
        subsections: [
          { subtitle: 'Sub 3', content: [] }
        ]
      }
    ]
  };

  const completedTopics = {
    'ch1_s0_sub0': true,
    'ch1_s0_sub1': true
  };

  let total = 0;
  let completed = 0;

  mockChapter.sections.forEach((sec, sIdx) => {
    sec.subsections.forEach((_, subIdx) => {
      total++;
      if (completedTopics[`ch${mockChapter.id}_s${sIdx}_sub${subIdx}`]) {
        completed++;
      }
    });
  });

  const percentage = Math.round((completed / total) * 100);

  assert.equal(total, 3);
  assert.equal(completed, 2);
  assert.equal(percentage, 67);
});

test('localStorage serialization and deserialization', () => {
  const initial = { 'ch1_s0_sub0': true, 'ch2_s1_sub2': true };
  const serialized = JSON.stringify(initial);
  const deserialized = JSON.parse(serialized);

  assert.deepEqual(deserialized, initial);
  assert.equal(deserialized['ch1_s0_sub0'], true);
  assert.equal(Boolean(deserialized['non_existent']), false);
});
