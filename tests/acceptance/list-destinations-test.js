import { test } from 'qunit';
import moduleForAcceptance from 'south-america-blog/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | list destinations');

test('visiting /', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
  });
});
