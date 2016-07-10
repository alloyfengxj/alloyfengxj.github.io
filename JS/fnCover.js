function fnCover() {
	var oCover = document.getElementById('cover');
	var oImage = oCover.getElementsByTagName('img')[0];
	move(oImage, {
		top: -180
	}, {
		duration: 4000
	});
	var t = true;
	var iNow = 1;
	setInterval(function() {
		if (t) {
			iNow++;
			if (iNow == 6) {
				t = false;
				var oLd = oImage;
				move(oLd, {
					opacity: 0
				}, {
					complete: function() {
						oCover.removeChild(oLd);
						move(oImage, {
							top: 0
						}, {
							duration: 4000
						});
					},
					duration: 4000
				})
				oImage = document.createElement('img');
				oImage.src = 'img/bg1.jpg';
				oImage.style.top = -180 + 'px';
				oCover.insertBefore(oImage, oCover.children[0]);
				iNow = 1;
				return false;
			}
			var oLd = oImage;
			move(oLd, {
				opacity: 0
			}, {
				complete: function() {
					oCover.removeChild(oLd);
					move(oImage, {
						top: -180
					}, {
						duration: 4000
					});
				},
				duration: 4000
			})
			oImage = document.createElement('img');
			oImage.src = 'img/bg' + iNow + '.jpg';
			oCover.insertBefore(oImage, oCover.children[0]);

		} else {
			iNow++;
			if (iNow == 6) {
				t = true;
				var oLd = oImage;
				move(oLd, {
					opacity: 0
				}, {
					complete: function() {
						oCover.removeChild(oLd);
						move(oImage, {
							top: -180
						}, {
							duration: 4000
						});
					},
					duration: 4000
				})
				oImage = document.createElement('img');

				oImage.src = 'img/bg1.jpg';
				oCover.insertBefore(oImage, oCover.children[0]);
				iNow = 1
				return false;
			};
			var oLd = oImage;
			move(oLd, {
				opacity: 0
			}, {
				complete: function() {
					oCover.removeChild(oLd);
					move(oImage, {
						top: 0
					}, {
						duration: 4000
					});
				},
				duration: 4000
			})
			oImage = document.createElement('img');
			oImage.style.top = -180 + 'px';
			oImage.src = 'img/bg' + iNow + '.jpg';
			oCover.insertBefore(oImage, oCover.children[0]);
		}
	}, 8000);
};