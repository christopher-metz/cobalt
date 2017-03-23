from subprocess import Popen, PIPE, STDOUT
import scipy.misc, numpy as np, os, sys
import json

dir_path = os.path.dirname(os.path.realpath(__file__))
cmd = 'python %s/style_transfer/evaluate.py --checkpoint %s/style_transfer/checkpoints/la_muse.ckpt --in-path %s/style_transfer/inputs/Headshot.jpg --out-path %s/style_transfer/results/outputCMDTest1.jpg' % (dir_path, dir_path, dir_path, dir_path)
p = Popen(cmd, shell=True, stdin=PIPE, stdout=PIPE, stderr=PIPE, close_fds=True)
output = p.stdout.read()
err = p.stderr.read()
# print ('stdout: ', type(np.asarray(json.loads(output.decode('utf-8')))))
print ('stderr: ', err)
scipy.misc.imsave('%s/style_transfer/results/myOwnSave1.jpg' % (dir_path), np.asarray(json.loads(output.decode('utf-8'))))
