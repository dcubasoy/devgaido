/* eslint-disable func-names no-console */
require('./registerBabel');

import { logErrors, logInvalidRelations,
  validateIdComposition, validateIdLength, validateRelationship,
  validateRequiredAttributes, validateUnknownAttributes } from './commonValidations';
import { getExpectedAttributes, getAllPaths } from '../src/server/services/corePaths';
import { getAllCourses } from '../src/server/services/coreCourses';

const assert = require('assert');

const maxPathIdLth = 24;

/**
 * Check the validity of the corepaths.json file
 */
describe('Validate corepaths.json', () => {
  describe('Validate attributes', () => {
    let invalidPathIds = [];
    afterEach(() => {
      invalidPathIds = logErrors(invalidPathIds);
    });
    it('should verify that the path contains all required attributes', () => {
      invalidPathIds = validateRequiredAttributes({ ...getAllPaths() }, getExpectedAttributes());
      assert.equal(invalidPathIds.length, 0);
    });
    it('should verify that there are no unknown attributes', () => {
      invalidPathIds = validateUnknownAttributes({ ...getAllPaths() }, getExpectedAttributes());
      assert.equal(invalidPathIds.length, 0);
    });
  });
  describe('Validate path id length', () => {
    let invalidPathIds = [];
    afterEach(() => {
      invalidPathIds = logErrors(invalidPathIds);
    });
    it('should verify that path ids are <= 24 characters', () => {
      invalidPathIds = validateIdLength({ ...getAllPaths() }, maxPathIdLth);
      assert.equal(invalidPathIds.length, 0);
    });
  });
  describe('Validate path id composition', () => {
    let invalidPathIds = [];
    afterEach(() => {
      invalidPathIds = logErrors(invalidPathIds);
    });
    it('should verify that path ids contain only lowercase letters and digits', () => {
      invalidPathIds = validateIdComposition({ ...getAllPaths() });
      assert.equal(invalidPathIds.length, 0);
    });
  });
  describe('Validate course ids in the path exists', () => {
    let invalidIds = [];
    afterEach(() => {
      invalidIds = logInvalidRelations('Path', 'Course', invalidIds);
    });
    it('should verify that course ids exist', () => {
      invalidIds = validateRelationship('courseIds', { ...getAllPaths() }, 'courseId', { ...getAllCourses() });
      assert.equal(invalidIds.length, 0);
    });
  });
});
