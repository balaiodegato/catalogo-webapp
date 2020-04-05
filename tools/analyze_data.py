
import sys
import json

data = json.loads(open(sys.argv[1]).read())
print("data loaded")

values_sets = {}

for entry in data:
  for key, value in entry.items():
    if key not in values_sets:
      values_sets[key] = set()
    if key == 'crop':
      value = json.dumps(value)
    values_sets[key].add(value)

print('Total keys:', len(values_sets.keys()))

if len(sys.argv) > 2 and sys.argv[2] in values_sets.keys():
  key = sys.argv[2]
  print('Key:', key, ' - number of values:', len(values_sets[key]))
  for value in values_sets[key]:
    print('"' + value + '"')
else:
  for key, value in values_sets.items():
    print('Key:', key, ' - number of values:', len(values_sets[key]))
