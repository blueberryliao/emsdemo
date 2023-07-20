<!-- @format -->

<template>
	<div class="ballot-counting">
		<div class="header">
			<div class="search-unit">
				<el-select
					v-model="contest"
					filterable
					size="small"
					class="search-item"
					clearable
					@change="handleQuery"
				>
					<el-option
						v-for="item in typeOptions"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					>
					</el-option>
				</el-select>
			</div>
		</div>
		<div class="content">
			<div class="content-left">
				<div class="info">
					<div class="info-item">Image Name:{{ info.imgName }}</div>
					<div class="info-item">
						Image Scan Time:{{ info.imgTime }}
					</div>
				</div>
				<div id="ballotCase" class="ballot-case">
					<canvas id="myCanvas" class="my-canvas"></canvas>
					<img
						id="myImg"
						class="ballot-image"
						src="../../../assets/img/ballot.jpg"
						alt=""
					/>
					<!-- <img id="test" src="../../../assets/img/ballot.jpg" /> -->
				</div>
				<div class="btn">
					<div class="btn-left">
						<el-button type="primary" size="small"
							>Submit</el-button
						>
					</div>
					<div class="btn-right">
						<el-button-group>
							<el-button icon="el-icon-arrow-left" size="small"
								>Previous</el-button
							>
							<el-button type="primary" size="small"
								>Next<i
									class="el-icon-arrow-right el-icon--right"
								></i
							></el-button>
						</el-button-group>
					</div>
				</div>
			</div>
			<div class="content-right">
				<div class="info">
					<div class="info-item">
						Scanned by Device:{{ info.deviceType }}
					</div>
					<div class="info-item">
						Precinct ID:{{ info.precinctId }}
					</div>
				</div>
				<div class="contest-case">
					<div class="contest-header">
						<div class="contest">Contest</div>
						<div class="contest-btn">
							<el-button-group>
								<el-button
									icon="el-icon-arrow-left"
									size="small"
									>Previous</el-button
								>
								<el-button type="primary" size="small"
									>Next<i
										class="el-icon-arrow-right el-icon--right"
									></i
								></el-button>
							</el-button-group>
						</div>
					</div>
					<div class="contest-content">
						<div class="content-title">
							State Representative Pos. 2
						</div>
						<div class="content-subtitle">Vote for One</div>
						<div class="contst-opt">
							<el-radio-group v-model="radio">
								<div>
									<el-radio :label="3" class="opt-item"
										>Teri Hichel (Prefer Republicaton
										Party)</el-radio
									>
								</div>
								<div>
									<el-radio :label="6" class="opt-item"
										>Carol Gregory (Prefer Democratic
										Party)</el-radio
									>
								</div>
								<div>
									<el-radio :label="9" class="opt-item"
										>Write-in</el-radio
									>
								</div>
							</el-radio-group>
						</div>
					</div>
					<div class="contest-bottom">
						<el-button size="small">Back</el-button>
						<el-button type="primary" size="small">Save</el-button>
					</div>
				</div>
				<div class="detaile-case">
					<div class="detail-item" v-for="item in duties">
						<div class="detail-title">
							{{ item.dutiesName }}
						</div>
						<div
							class="details"
							v-for="i in item.candidateDataList"
						>
							<div
								class="detail-content"
								:class="
									item.status == 'valid' ? 'green' : 'red'
								"
							>
								{{ i.candidateName }}
							</div>
						</div>
					</div>
				</div>
				<div class="bottom">
					{{ info.count }} ballots remain to be adjudicated
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import imgUrl from '@/assets/img/ballot.jpg';
import { getBallotInfo } from '@/api/ballot';
export default {
	data() {
		return {
			info: null, //从后台获取的对象
			adjudicatorList: null, //右上框数据
			duties: null, //右下框数据
			redBlocks: [], //红框
			// count: 0,
			contest: 1,
			typeOptions: [
				{ label: 'all', value: '' },
				{
					label: 'Sample Election',
					value: 1
				},
				{
					label: 'President',
					value: 2
				},
				{
					label: 'Senator',
					value: 3
				}
			],
			radio: 3,
			imgUrl: imgUrl,
			ballotCaseDom: null,
			canvasDom: null, //canvasDom 对象
			myCanvas: null, // canvas对象
			myImgDom: null,
			pixelWidth: 0, //图片实际的像素宽度
			pixelHeight: 0,
			showHeight: 0 //canvas区域的的视在高度
		};
	},
	computed: {
		//计算属性
		rate: {
			get() {
				return this.pixelHeight / this.showHeight;
			},
			set(val) {}
		},
		showWidth: {
			get() {
				return this.pixelWidth / this.rate;
			}
		}
	},

	methods: {
		/** 搜索按钮操作 */
		handleQuery() {
			clearTimeout(this.timer);
			this.timer = setTimeout(() => {
				// this.pageNum = 1;
				// this.getInfo();
			}, 300);
		},
		/** 获取终端信息 */
		getInfo() {
			let query = {
				id: 1000
			};
			return getBallotInfo(query).then((res) => {
				if (res.code == 200) {
					console.log('res.rows', res.data);
					this.info = res.data;
				}
			});
		},

		/** 绘制canvas图 */
		drawImage() {
			console.log('this.pixelWidth', this.pixelWidth);
			console.log('this.pixelHeight', this.pixelHeight);
			console.log('this.showWidth', this.showWidth);
			console.log('this.showHeight', this.showHeight);
			console.log('this.rate', this.rate);
			// 如果要设置行内样式的宽高，即实际像素的宽高，设置方式为：
			this.canvasDom.setAttribute('width', this.pixelWidth);
			this.canvasDom.setAttribute('height', this.pixelHeight);
			//有时也需要设置canvas的视在宽高，即实际显示的宽度和高度，设置方法为：
			this.canvasDom.style.setProperty('width', this.showWidth + 'px');
			this.canvasDom.style.setProperty('height', this.showHeight + 'px');
			// this.myImg.src = `${this.imgUrl}`;
			this.myImgDom.onload = () => {
				this.myCanvas.drawImage(
					this.myImgDom,
					0,
					0,
					this.pixelWidth,
					this.pixelHeight
				);
				this.redBlocks.forEach((element) => {
					this.drawRedBox(
						element.x,
						element.y,
						element.width,
						element.height
					);
				});
			};
		},
		drawRedBox(x, y, w, h) {
			this.myCanvas.strokeStyle = 'red';
			this.myCanvas.lineWidth = 5;
			this.myCanvas.lineJoin = 'round';
			this.myCanvas.strokeRect(x, y, w, h);
		}
	},
	created() {},
	async mounted() {
		//获取选票的实际像素尺寸
		await this.getInfo();
		this.pixelWidth = this.info.maxWidth;
		this.pixelHeight = this.info.maxHeight;
		this.duties = this.info.duties;
		this.adjudicatorList = this.info.duties.filter((i) => {
			return i.status == 'invalid';
		});
		console.log(this.adjudicatorList);
		this.adjudicatorList.map((i) => {
			this.redBlocks.push({
				x: i.x,
				y: i.y,
				width: i.width,
				height: i.height
			});
		});
		console.log(this.redBlocks);
		// this.imgName = this.info.imgName;
		this.$nextTick(function () {
			//获取绘图相关DOM及canvas对象
			this.canvasDom = document.getElementById('myCanvas');
			this.ballotCaseDom = document.getElementById('ballotCase');
			this.myImgDom = document.getElementById('myImg');
			this.myCanvas = this.canvasDom.getContext('2d');
			//获取图片视高
			this.showHeight = this.ballotCaseDom.scrollHeight;
			//绘图
			this.drawImage();
		});
	}
};
</script>

<style lang="scss" scoped>
* {
	box-sizing: border-box;
}
.ballot-counting {
	width: 100%;
	height: 100%;
	.red {
		color: #f56c6c;
	}
	.green {
		color: #67c23a;
	}
	.header {
		height: 60px;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20px;
		.search-unit {
			margin-right: 40px;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			.search-title {
				margin-right: 5px;
			}
			.search-item {
				width: 200px;
			}
		}
	}

	.content {
		height: calc(100% - 60px);
		display: flex;
		.content-left {
			width: 55%;
			height: 100%;
			padding: 10px 20px;
			.ballot-case {
				height: calc(100% - 80px);
				width: 100%;
				border: 2px #d4d4d7 solid;
				// padding: 10px;
				// img {
				//   height: 100%;
				//   text-align: center;
				// }
				.my-canvas {
					// height: 100%;
					display: block;
					margin: 0 auto;
				}
				.ballot-image {
					height: 0;
					width: 0;
				}
			}
			.btn {
				height: 60px;
				line-height: 60px;
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
		}
		.content-right {
			width: 45%;
			height: 100%;
			padding: 10px 20px;
			.contest-case {
				height: 350px;
				border: 2px #d4d4d7 solid;
				.contest-header {
					height: 60px;
					line-height: 60px;
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 0 10px;
					border-bottom: 1px dashed #d4d4d7;
					.contest {
						color: #5a9cf8;
						font-size: 18px;
						font-weight: 900;
					}
				}
				.contest-content {
					height: calc(100% - 120px);
					overflow: auto;
					padding: 0 20px;
					.content-title {
						font-size: 16px;
						font-weight: 900;
						line-height: 30px;
						height: 30px;
					}
					.content-subtitle {
						font-size: 16px;
						padding-bottom: 10px;
					}
					.opt-item {
						height: 40px;
						line-height: 40px;
						padding-left: 20px;
					}
				}
				.contest-bottom {
					height: 60px;
					line-height: 60px;
					display: flex;
					align-items: center;
					justify-content: flex-end;
					padding: 0 10px;
					border-top: 1px dashed #d4d4d7;
				}
			}
			.detaile-case {
				height: calc(100% - 350px - 20px - 60px - 20px);
				border: 2px #d4d4d7 solid;
				overflow-y: auto;
				padding: 10px 20px;
				margin-top: 20px;
				.detail-item {
					margin-bottom: 20px;
					.detail-title {
						font-size: 18px;
						font-weight: 900;
						line-height: 30px;
						height: 30px;
						text-decoration: underline;
					}
					.detail-content {
						padding-left: 20px;
						font-size: 18px;
						line-height: 30px;
						height: 30px;
					}
				}
			}
			.bottom {
				height: 60px;
				line-height: 60px;
				font-size: 20px;
				font-weight: 900;
				text-align: right;
			}
		}
		.info {
			display: flex;
			height: 20px;
			line-height: 20px;
			margin-bottom: 10px;
			.info-item {
				margin-right: 20px;
			}
		}
	}
}
</style>
