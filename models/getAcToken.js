var api = new API('appid', 'secret', function (callback) {
  // ����һ����ȡȫ��token�ķ���
  fs.readFile('access_token.txt', 'utf8', function (err, txt) {
    if (err) {return callback(err);}
    callback(null, JSON.parse(txt));
  });
}, function (token, callback) {
  // �뽫token�洢��ȫ�֣�����̡�����������ȫ�֣�����д�����ݿ⡢redis��
  // ����������clusterģʽ����������ʹ�ã�����Ϊд�뵽�ļ���ʾ��
  fs.writeFile('access_token.txt', JSON.stringify(token), callback);
});