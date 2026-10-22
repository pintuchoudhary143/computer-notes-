import test from 'node:test';
import assert from 'node:assert/strict';
import { dailyChallengeQuestions, getTodayChallengeIndex } from './dailyChallengeQuestions.ts';
import { allExcelFormulas, excelCategories } from './excelFormulasData.ts';

test('daily challenge question pool is populated across all chapters', () => {
  assert.ok(dailyChallengeQuestions.length >= 20, 'Should have at least 20 daily challenge questions');
  const chaptersRepresented = new Set(dailyChallengeQuestions.map(q => q.chapterNumber));
  // All 8 chapters should be represented
  for (let ch = 1; ch <= 8; ch++) {
    assert.ok(chaptersRepresented.has(ch), `Chapter ${ch} should be represented in daily challenge questions`);
  }
});

test('each daily challenge question has valid structure and correct option', () => {
  for (const q of dailyChallengeQuestions) {
    assert.ok(q.question.length > 5, `Question ${q.id} should have non-empty question`);
    assert.ok(Object.keys(q.options).length >= 4, `Question ${q.id} should have 4 options`);
    assert.ok(q.options[q.correctOption], `Question ${q.id} correctOption ${q.correctOption} should exist in options`);
    assert.ok(q.explanation.length > 10, `Question ${q.id} should have meaningful explanation`);
    assert.ok(q.memoryAnchor.length > 10, `Question ${q.id} should have memory anchor`);
  }
});

test('getTodayChallengeIndex returns deterministic in-bounds index', () => {
  const total = dailyChallengeQuestions.length;
  const idx1 = getTodayChallengeIndex(total, '2026-10-20');
  const idx2 = getTodayChallengeIndex(total, '2026-10-20');
  const idxTomorrow = getTodayChallengeIndex(total, '2026-10-21');

  assert.equal(idx1, idx2, 'Same date must return same challenge index');
  assert.ok(idx1 >= 0 && idx1 < total, 'Index must be within bounds');
  assert.ok(idxTomorrow >= 0 && idxTomorrow < total, 'Tomorrow index must be within bounds');
});

test('excel formulas catalog contains over 100 formulas with required categories', () => {
  assert.ok(allExcelFormulas.length >= 100, `Expected 100+ formulas, got ${allExcelFormulas.length}`);
  const expectedCategories = ['Math', 'Statistical', 'Logical', 'Lookup', 'Text', 'Date', 'Financial', 'DynamicArray', 'Info'];
  const categoriesInFormulas = new Set(allExcelFormulas.map(f => f.category));
  for (const cat of expectedCategories) {
    assert.ok(categoriesInFormulas.has(cat as any), `Category ${cat} should be present in formulas catalog`);
  }
});
